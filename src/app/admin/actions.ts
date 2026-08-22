"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized: You must be logged in to perform this action.");
  }
}

async function saveFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0 || typeof file === "string") return null;
  const bytes = await file.arrayBuffer();
  const buffer = new Uint8Array(bytes);
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
  const filepath = path.join(process.cwd(), "public/uploads", filename);
  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

export async function updateHomeSettings(formData: FormData) {
  await requireAuth();
  try {
    // Handle multiple checkboxes for featured projects
    const featuredProjects = formData.getAll('home_featured_projects');
    
    const data = Object.fromEntries(formData.entries());
    
    if (featuredProjects.length > 0) {
      data['home_featured_projects'] = featuredProjects.join(',');
    } else {
      // If none selected, we might still want to clear it if it was in the form
      // but only if the form actually included the hidden field or if we enforce it.
      // A trick is to always include a hidden field so we know the tab was submitted.
      if (formData.has('featured_projects_submitted')) {
        data['home_featured_projects'] = '';
      }
    }

    
    // Find all keys ending in _imageFile
    for (const [key, value] of Object.entries(data)) {
      if (key.endsWith('_imageFile') && value instanceof File && value.size > 0) {
        const prefix = key.replace('_imageFile', '');
        const uploadedPath = await saveFile(value);
        if (uploadedPath) {
          data[`${prefix}_image`] = uploadedPath;
        }
      } else if (key.endsWith('_imageUrl') && typeof value === 'string' && value.trim() !== '') {
        const prefix = key.replace('_imageUrl', '');
        if (!data[`${prefix}_image`]) {
           data[`${prefix}_image`] = value;
        }
      }
    }

    // Clean up temporary file/url fields before saving to DB
    const keysToDelete = Object.keys(data).filter(k => k.endsWith('_imageFile') || k.endsWith('_imageUrl'));
    for (const k of keysToDelete) {
      delete data[k];
    }

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }
    
    // Revalidate public home page to reflect changes instantly via ISR
    revalidatePath("/");
    
    return { success: true, message: "Settings updated successfully" };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, message: "Failed to update settings" };
  }
}

export async function updateValueItem(id: number, data: { title: string, pointA: string, pointB: string, pointC: string }) {
  await requireAuth();
  try {
    await prisma.value.update({
      where: { id },
      data
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function createValue(data: { title: string, pointA: string, pointB: string, pointC: string, order?: number }) {
  await requireAuth();
  try {
    await prisma.value.create({ data });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteValue(id: number) {
  await requireAuth();
  try {
    await prisma.value.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function updateAdvantageItem(id: number, data: { title: string, description: string, icon: string }) {
  await requireAuth();
  try {
    await prisma.advantage.update({
      where: { id },
      data
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function createAdvantage(data: { title: string, description: string, icon: string, order?: number }) {
  await requireAuth();
  try {
    await prisma.advantage.create({ data });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteAdvantage(id: number) {
  await requireAuth();
  try {
    await prisma.advantage.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function markMessageRead(id: number) {
  await requireAuth();
  try {
    await prisma.message.update({
      where: { id },
      data: { isRead: true }
    });
    revalidatePath("/admin/messages");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function getCategories(type?: string) {
  await requireAuth();
  try {
    return await prisma.category.findMany({ 
      where: type ? { type } : undefined,
      orderBy: { createdAt: 'desc' } 
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createCategory(data: { name: string, description?: string, type?: string }) {
  await requireAuth();
  try {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const type = data.type || "product";
    await prisma.category.create({ data: { name: data.name, description: data.description, type, slug } });
    revalidatePath("/admin/categories");
    revalidatePath("/product");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create category" };
  }
}

export async function updateCategory(id: number, data: { name: string, description?: string, type?: string }) {
  await requireAuth();
  try {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const type = data.type || "product";
    await prisma.category.update({
      where: { id },
      data: { name: data.name, description: data.description, type, slug }
    });
    revalidatePath("/admin/categories");
    revalidatePath("/product");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update category" };
  }
}

export async function deleteCategory(id: number) {
  await requireAuth();
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    revalidatePath("/product");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete category" };
  }
}

export async function createProduct(formData: FormData) {
  await requireAuth();
  try {
    const imageFile = formData.get("imageFile") as File | null;
    let imageUrl = "";
    const uploadedPath = await saveFile(imageFile);
    if (uploadedPath) imageUrl = uploadedPath;
    
    // Process gallery files
    const galleryFiles = formData.getAll("galleryFiles") as File[];
    const galleryPaths: string[] = [];
    for (const file of galleryFiles) {
      if (file && file.size > 0) {
        const path = await saveFile(file);
        if (path) galleryPaths.push(path);
      }
    }
    const gallery = galleryPaths.length > 0 ? JSON.stringify(galleryPaths) : null;
    
    const name = formData.get("name") as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        description: formData.get("description") as string,
        categoryId: parseInt(formData.get("categoryId") as string),
        imageUrl: imageUrl || "",
        gallery,
        specs: (formData.get("specs") as string) || null,
        datasheetUrl: await (async () => {
          const dsFile = formData.get("datasheetFile") as File | null;
          const uploaded = await saveFile(dsFile);
          return uploaded || (formData.get("datasheetUrl") as string) || null;
        })(),
        isPublished: formData.get("isPublished") === "on",
      }
    });
    revalidatePath("/admin/products");
    revalidatePath("/product");
    return { success: true, id: newProduct.id };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create product" };
  }
}

export async function createProject(formData: FormData) {
  await requireAuth();
  try {
    const completionDateStr = formData.get("completionDate") as string;
    let imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("imageFile") as File | null;
    const uploadedPath = await saveFile(imageFile);
    if (uploadedPath) imageUrl = uploadedPath;
    
    let brochureUrl = formData.get("brochureUrl") as string | null;
    const brochureFile = formData.get("brochureFile") as File | null;
    const uploadedBrochure = await saveFile(brochureFile);
    if (uploadedBrochure) brochureUrl = uploadedBrochure;
    
    const name = formData.get("name") as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newProject = await prisma.project.create({
      data: {
        name,
        slug,
        description: formData.get("description") as string,
        location: formData.get("location") as string,
        capacity: formData.get("capacity") as string,
        categoryId: formData.get("categoryId") ? parseInt(formData.get("categoryId") as string) : null,
        contentData: formData.get("contentData") as string || null,
        brochureUrl: brochureUrl || null,
        imageUrl: imageUrl || "",
        completionDate: completionDateStr ? new Date(completionDateStr) : null,
        isPublished: formData.get("isPublished") === "on",
      }
    });
    revalidatePath("/admin/projects");
    revalidatePath("/project");
    return { success: true, id: newProject.id };
  } catch (error: any) {
    console.error("Create Project Error:", error);
    return { success: false, message: error?.message || "Failed to create project" };
  }
}

export async function updateProduct(id: number, formData: FormData) {
  await requireAuth();
  try {
    let imageUrl = formData.get("existingImageUrl") as string | null;
    const imageFile = formData.get("imageFile") as File | null;
    const uploadedPath = await saveFile(imageFile);
    if (uploadedPath) imageUrl = uploadedPath;
    
    // Process gallery files
    const galleryFiles = formData.getAll("galleryFiles") as File[];
    const newGalleryPaths: string[] = [];
    for (const file of galleryFiles) {
      if (file && file.size > 0) {
        const path = await saveFile(file);
        if (path) newGalleryPaths.push(path);
      }
    }
    
    const existingGalleryStr = formData.get("existingGallery") as string;
    let existingGallery: string[] = [];
    if (existingGalleryStr) {
      try {
        existingGallery = JSON.parse(existingGalleryStr);
      } catch (e) {}
    }
    
    const finalGalleryPaths = [...existingGallery, ...newGalleryPaths];
    const gallery = finalGalleryPaths.length > 0 ? JSON.stringify(finalGalleryPaths) : null;
    
    const name = formData.get("name") as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Handle datasheet file upload
    let datasheetUrl = formData.get("existingDatasheetUrl") as string | null;
    const datasheetFile = formData.get("datasheetFile") as File | null;
    const uploadedDatasheet = await saveFile(datasheetFile);
    if (uploadedDatasheet) datasheetUrl = uploadedDatasheet;
    // If user explicitly cleared it
    if (formData.get("clearDatasheet") === "true") datasheetUrl = null;

    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description: formData.get("description") as string,
        categoryId: parseInt(formData.get("categoryId") as string),
        imageUrl: imageUrl || "",
        gallery,
        specs: (formData.get("specs") as string) || null,
        datasheetUrl,
        isPublished: formData.get("isPublished") === "on",
      }
    });
    revalidatePath("/admin/products");
    revalidatePath("/product");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update product" };
  }
}

export async function deleteProduct(id: number) {
  await requireAuth();
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    revalidatePath("/product");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete product" };
  }
}

export async function updateProject(id: number, formData: FormData) {
  await requireAuth();
  try {
    const completionDateStr = formData.get("completionDate") as string;
    let imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("imageFile") as File | null;
    const uploadedPath = await saveFile(imageFile);
    if (uploadedPath) imageUrl = uploadedPath;
    
    let brochureUrl = formData.get("brochureUrl") as string | null;
    const brochureFile = formData.get("brochureFile") as File | null;
    const uploadedBrochure = await saveFile(brochureFile);
    if (uploadedBrochure) brochureUrl = uploadedBrochure;
    
    const name = formData.get("name") as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await prisma.project.update({
      where: { id },
      data: {
        name,
        slug,
        description: formData.get("description") as string,
        location: formData.get("location") as string,
        capacity: formData.get("capacity") as string,
        categoryId: formData.get("categoryId") ? parseInt(formData.get("categoryId") as string) : null,
        contentData: formData.get("contentData") as string || null,
        brochureUrl: brochureUrl || null,
        imageUrl: imageUrl || "",
        completionDate: completionDateStr ? new Date(completionDateStr) : null,
        isPublished: formData.get("isPublished") === "on",
      }
    });
    revalidatePath("/admin/projects");
    revalidatePath("/project");
    return { success: true };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Failed to update project" };
  }
}

export async function deleteProject(id: number) {
  await requireAuth();
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
    revalidatePath("/project");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete project" };
  }
}

export async function updateSiteSettings(formData: FormData) {
  await requireAuth();
  try {
    const keys = [
      "hq_address", "warehouse_address", "hq_phone1", "hq_phone2", "contact_email", "contact_whatsapp"
    ];
    for (const key of keys) {
      const value = formData.get(key) as string;
      if (value !== null && value !== undefined) {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value }
        });
      }
    }

    // Handle Mobile Nav Image
    const navImageFile = formData.get("navImageFile") as File | null;
    let finalNavImageUrl = formData.get("navImageUrl") as string;
    
    if (navImageFile && navImageFile.size > 0) {
      const uploadedPath = await saveFile(navImageFile);
      if (uploadedPath) {
        finalNavImageUrl = uploadedPath;
      }
    }
    
    if (finalNavImageUrl) {
       await prisma.siteSetting.upsert({
          where: { key: "mobile_nav_image" },
          update: { value: finalNavImageUrl },
          create: { key: "mobile_nav_image", value: finalNavImageUrl }
       });
    }
    revalidatePath("/admin/site-settings");
    revalidatePath("/contact");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update site settings" };
  }
}

// ============================================
// Certificate CRUD
// ============================================

export async function getCertificates() {
  await requireAuth();
  return await prisma.certificate.findMany({ orderBy: { order: 'asc' } });
}

export async function createCertificate(formData: FormData) {
  await requireAuth();
  try {
    const name = formData.get("name") as string;
    const files = formData.getAll("imageFiles") as File[];
    
    if (!files || files.length === 0 || files[0].size === 0) {
      return { success: false, message: "File sertifikat wajib diunggah" };
    }

    const savedPaths: string[] = [];
    for (const file of files) {
      if (file && file.size > 0) {
        const path = await saveFile(file);
        if (path) savedPaths.push(path);
      }
    }

    if (savedPaths.length === 0) {
      return { success: false, message: "Gagal menyimpan file" };
    }

    const isPdf = savedPaths[0].toLowerCase().endsWith('.pdf');

    await prisma.certificate.create({
      data: {
        name,
        imageUrl: savedPaths[0],
        gallery: savedPaths.length > 1 ? JSON.stringify(savedPaths.slice(1)) : null,
        fileType: isPdf ? "pdf" : "image",
        order: await prisma.certificate.count(),
      }
    });
    revalidatePath("/admin/certificates");
    revalidatePath("/product");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create certificate" };
  }
}

export async function deleteCertificate(id: number) {
  await requireAuth();
  try {
    await prisma.certificate.delete({ where: { id } });
    revalidatePath("/admin/certificates");
    revalidatePath("/product");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete certificate" };
  }
}
