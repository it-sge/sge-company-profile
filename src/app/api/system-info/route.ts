import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import os from "os";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Measure DB Latency
    const startDb = performance.now();
    await prisma.$queryRaw`SELECT 1`; // Simple ping to DB
    const dbLatency = performance.now() - startDb;

    // Memory usage
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const processMem = process.memoryUsage();

    // CPU Info
    const cpus = os.cpus();
    const cpuModel = cpus[0]?.model || "Unknown CPU";
    const cores = cpus.length;
    
    // Quick load average (1, 5, 15 min) - Note: not fully supported on Windows but returns values
    const loadAvg = os.loadavg(); 
    const cpuUsagePercent = cores > 0 ? (loadAvg[0] / cores) * 100 : 0;

    // Get database counts
    const productsCount = await prisma.product.count();
    const projectsCount = await prisma.project.count();
    const messagesCount = await prisma.message.count();
    const categoriesCount = await prisma.category.count();

    const systemInfo = {
      os: {
        platform: os.platform(),
        release: os.release(),
        type: os.type(),
        arch: os.arch(),
        uptime: os.uptime(),
      },
      cpu: {
        model: cpuModel,
        cores,
        usagePercent: cpuUsagePercent > 100 ? 100 : cpuUsagePercent,
      },
      memory: {
        total: totalMem,
        free: freeMem,
        used: usedMem,
        processUsed: processMem.heapUsed,
        processTotal: processMem.heapTotal,
      },
      app: {
        nodeVersion: process.version,
        nextVersion: require("next/package.json").version,
        uptime: process.uptime(),
        env: process.env.NODE_ENV,
      },
      database: {
        latencyMs: dbLatency,
        status: dbLatency < 100 ? "Excellent" : dbLatency < 500 ? "Good" : "Slow",
        stats: {
          products: productsCount,
          projects: projectsCount,
          messages: messagesCount,
          categories: categoriesCount
        }
      }
    };

    return NextResponse.json(systemInfo);
  } catch (error) {
    console.error("System info error:", error);
    return NextResponse.json({ error: "Failed to fetch system info" }, { status: 500 });
  }
}
