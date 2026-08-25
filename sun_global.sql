-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 22 Agu 2026 pada 11.05
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sun_global`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `advantage`
--

CREATE TABLE `advantage` (
  `id` int(11) NOT NULL,
  `icon` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `advantage`
--

INSERT INTO `advantage` (`id`, `icon`, `title`, `description`, `order`) VALUES
(5, 'PackageCheck', 'Product Quality', 'Supplying top tier com-ponents only', 1),
(6, 'HardHat', 'Profesional Service', 'Experienced and certi-fied teams', 2),
(7, 'HandCoins', 'Best Price', 'Guaranteed competitive solutions', 3),
(8, 'Headset', 'Helpdesk', 'Our customer care is ready to respond timely', 4);

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'product'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `name`, `slug`, `description`, `createdAt`, `updatedAt`, `type`) VALUES
(1, 'Solar Panel', 'solar-panel', 'Kategori yang berisi berbagai modul panel surya berkualitas tinggi untuk kebutuhan pembangkit listrik tenaga surya (PLTS). Tersedia panel Monocrystalline, Polycrystalline, Mono-Facial, dan Bi-Facial dengan efisiensi tinggi untuk aplikasi residensial, komersial, dan industri.', '2026-07-23 19:46:02.131', '2026-07-23 19:46:02.131', 'product'),
(2, 'Solar Inverter', 'solar-inverter', 'Berisi inverter surya berkinerja tinggi yang mengubah arus DC dari panel surya menjadi arus AC untuk digunakan pada instalasi rumah, komersial, maupun industri.', '2026-07-23 19:46:24.858', '2026-07-23 19:46:24.858', 'product'),
(3, 'Battery Storage', 'battery-storage', 'Berisi baterai penyimpanan energi untuk sistem PLTS yang memungkinkan penggunaan listrik pada malam hari atau saat terjadi pemadaman listrik.', '2026-07-23 19:46:39.568', '2026-07-23 19:46:39.568', 'product'),
(4, 'Mounting System', 'mounting-system', 'Berisi sistem mounting dan struktur penyangga panel surya seperti rail, clamp, bracket, hook, dan aksesoris lainnya yang dirancang agar pemasangan panel surya lebih kuat, aman, dan tahan lama.', '2026-07-23 19:47:02.849', '2026-07-23 19:47:02.849', 'product'),
(5, 'Electrical Accessories', 'electrical-accessories', 'Berisi berbagai aksesoris kelistrikan PLTS seperti kabel DC, konektor MC4, fuse, isolator, junction box, dan komponen pendukung instalasi lainnya.', '2026-07-23 19:47:21.318', '2026-07-23 19:47:21.318', 'product'),
(6, 'Monitoring System', 'monitoring-system', 'Berisi perangkat monitoring dan smart logger yang digunakan untuk memantau performa sistem PLTS secara real-time melalui aplikasi maupun web.', '2026-07-23 19:47:39.101', '2026-07-23 19:47:39.101', 'product'),
(7, 'Protection Device', 'protection-device', 'Berisi perangkat proteksi kelistrikan seperti SPD, MCB, MCCB, fuse holder, dan perlengkapan pengaman lainnya untuk menjaga sistem PLTS tetap aman dan andal.', '2026-07-23 19:47:59.576', '2026-07-23 19:47:59.576', 'product'),
(8, 'Installation Tools', 'installation-tools', 'Berisi berbagai alat instalasi profesional untuk pemasangan dan perawatan sistem PLTS seperti crimping tool, torque wrench, cable cutter, dan perlengkapan teknis lainnya.', '2026-07-23 19:48:16.199', '2026-07-23 19:48:16.199', 'product'),
(9, 'Commercial & Industrial (C&I)', 'commercial-industrial-c-i', 'Untuk proyek pabrik, gudang, dan kawasan industri.', '2026-07-23 23:40:36.919', '2026-07-23 23:40:36.919', 'project'),
(10, 'Retail & Malls', 'retail-malls', 'Untuk proyek di pusat perbelanjaan atau gedung ritel besar.', '2026-07-23 23:42:55.172', '2026-07-23 23:42:55.172', 'project'),
(11, 'Healthcare & Hospitals', 'healthcare-hospitals', 'Untuk instalasi panel surya di fasilitas medis.', '2026-07-23 23:43:11.046', '2026-07-23 23:43:11.046', 'project'),
(12, 'Education & Campuses', 'education-campuses', 'ntuk proyek di universitas atau yayasan sekolah.', '2026-07-23 23:43:25.918', '2026-07-23 23:43:25.918', 'project'),
(13, 'Government & Public Sector', 'government-public-sector', 'Untuk proyek fasilitas negara atau pemerintah.', '2026-07-23 23:43:40.278', '2026-07-23 23:43:40.278', 'project');

-- --------------------------------------------------------

--
-- Struktur dari tabel `certificate`
--

CREATE TABLE `certificate` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `imageUrl` varchar(191) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `fileType` varchar(191) NOT NULL DEFAULT 'image',
  `gallery` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `certificate`
--

INSERT INTO `certificate` (`id`, `name`, `imageUrl`, `order`, `createdAt`, `fileType`, `gallery`) VALUES
(2, ' Sertifikat Produk Penggunaan Tanda SNI (SPPT-SNI)', '/uploads/1787355747041-012SPPTSNIBatchmultiglobalFinal.pdf', 0, '2026-08-21 23:42:27.055', 'pdf', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `subject` varchar(191) DEFAULT NULL,
  `message` text NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `message`
--

INSERT INTO `message` (`id`, `name`, `email`, `phone`, `subject`, `message`, `isRead`, `createdAt`) VALUES
(1, 'Keith Lowe', 'nitilefiz@mailinator.com', '+1 (835) 969-3704', NULL, 'Quis distinctio Sin', 1, '2026-07-20 23:37:23.106'),
(2, 'Igor Medina', 'hihafukod@mailinator.com', '+1 (222) 564-3049', NULL, 'Aperiam magni ad nob', 1, '2026-08-21 23:52:35.008'),
(3, 'Tanya Dejesus', 'ledejyfumi@mailinator.com', '+1 (844) 322-7608', NULL, 'Possimus ut fugiat sadnasojdnsandknsakjdsa d sadsa  dsa dak dkad askdasd sdnjad sajdkajndas d d adkjbkdajnda dajdnkasdnasdsa dkdsajsadndoufef ', 1, '2026-08-21 23:53:07.601');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `specs` text DEFAULT NULL,
  `imageUrl` varchar(191) NOT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT 1,
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `gallery` text DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `datasheetUrl` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `slug`, `name`, `description`, `specs`, `imageUrl`, `isPublished`, `order`, `createdAt`, `updatedAt`, `gallery`, `categoryId`, `datasheetUrl`) VALUES
(14, 'solar-panel-zxi8-bd120-630-670w', 'Solar Panel ZXI8-BD120 630-670W', 'High-efficiency monocrystalline solar panel module with PU Frame construction. The ZXI8-BD120 series delivers exceptional power output of 630-670W, featuring 210mm half-cut cells for superior performance and reliability. Ideal for large-scale commercial and industrial rooftop installations.', '{\"Solar cells\":\"N-type Monocrystalline\",\"Cells orientation\":\"120 (6×20)\",\"Module dimension\":\"2172×1303×30 mm (With Frame)\",\"Weight\":\"33.5±1 kg\",\"Glass\":\"2.0 mm+2.0mm, High Transmission, AR Coated Heat Strengthened Glass\",\"Junction box\":\"IP 68, 3 diodes\",\"Cables\":\"4 mm², +300mm,-200mm or Customized Length(with connectors)\",\"Connectors\":\"MC4 compatible or MC4-EVO2\",\"Fire safety class\":\"Class A+A\",\"Datasheet\":\"/project/ZXI8-BD120.pdf\"}', '/uploads/1787357442061-beautiful-alternative-energy-plant-with-solar-panels.webp', 1, 1, '2026-08-20 21:57:36.512', '2026-08-22 00:10:42.067', '[\"/project/SOLAR-CELL 1.webp\",\"/project/SOLAR-CELL 2.webp\"]', 1, ''),
(15, 'solar-panel-zxi8-bd132-695-730w', 'Solar Panel ZXI8-BD132 695-730W', 'Premium high-power monocrystalline solar panel module with PU Composite Frame. The ZXI8-BD132 series offers industry-leading power output of 695-730W with 210mm advanced cell technology. Engineered for maximum energy yield in utility-scale and large commercial projects with a 350mm junction box spacing.', '{\"Solar cells\":\"N-type Monocrystalline\",\"Cells orientation\":\"132 (6×22)\",\"Module dimension\":\"2384×1303×30 mm (With Frame)\",\"Weight\":\"38.5±1 kg\",\"Glass\":\"2.0 mm+2.0mm, High Transmission, AR Coated Heat Strengthened Glass\",\"Junction box\":\"IP 68, 3 diodes\",\"Cables\":\"4 mm², +300mm,-200mm or Customized Length(with connectors)\",\"Connectors\":\"MC4 compatible or MC4-EVO2\",\"Fire safety class\":\"Class A+A\",\"Datasheet\":\"/project/ZXI8-BD132.pdf\"}', '/project/SOLAR CELL NEW.webp', 1, 2, '2026-08-20 21:57:36.521', '2026-08-20 21:57:36.521', '[\"/project/solar-cell-farm-power-station-alternative-energy-from-sun.webp\"]', 1, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `imageUrl` varchar(191) NOT NULL,
  `gallery` text DEFAULT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT 1,
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `capacity` varchar(191) DEFAULT NULL,
  `completionDate` datetime(3) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `contentData` longtext DEFAULT NULL,
  `brochureUrl` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `project`
--

INSERT INTO `project` (`id`, `slug`, `name`, `location`, `description`, `imageUrl`, `gallery`, `isPublished`, `order`, `createdAt`, `updatedAt`, `capacity`, `completionDate`, `categoryId`, `contentData`, `brochureUrl`) VALUES
(26, 'ascott-jakarta', 'Ascott Jakarta', 'Jakarta, Indonesia', 'Proyek instalasi panel surya di Ascott Serviced Residences Jakarta, salah satu gedung apartemen berlayanan premium di pusat kota Jakarta. Proyek ini membuktikan kemampuan kami dalam memberikan solusi tenaga surya untuk gedung perhotelan bertingkat tinggi.', '/uploads/1787263616145-63756794-ASCOTTJAKARTA3.webp', NULL, 1, 1, '2026-08-20 21:57:36.470', '2026-08-20 22:06:57.471', '125 kWp', '2023-08-15 00:00:00.000', NULL, '{\"quickStats\":{\"solarPanels\":\"215 Modul\",\"inverters\":\"2 Unit\",\"system\":\"On-Grid\",\"roi\":\"3.5 Tahun\",\"co2Reduction\":\"150 Ton/th\"},\"overview\":{\"challenge\":\"Tingginya biaya operasional energi dari sistem pendingin gedung (HVAC) dan penerangan 24 jam yang membebani manajemen apartemen.\",\"solution\":\"Desain dan instalasi sistem PLTS Atap (On-Grid) berkapasitas 125 kWp menggunakan panel surya berefisiensi tinggi ZXI8.\",\"result\":\"Penghematan tagihan listrik hingga 25% setiap bulannya dan peningkatan nilai properti sebagai green building.\"},\"projectInfo\":{\"client\":\"Ascott International Management\",\"industry\":\"Hospitality\",\"projectType\":\"Rooftop Solar\",\"installation\":\"Agustus 2023\",\"duration\":\"60 Hari\",\"epcContractor\":\"Sun Global Energi\",\"warranty\":\"25 Tahun (Panel), 10 Tahun (Inverter)\",\"monitoring\":\"Real-time Web App\"},\"equipment\":[{\"name\":\"ZXI8-BD120 630-670W\",\"type\":\"Solar Panel\",\"quantity\":\"215 Unit\",\"image\":\"/project/SOLAR CELL NEW - WEB.webp\"},{\"name\":\"Sungrow SG125CX-P2\",\"type\":\"Inverter\",\"quantity\":\"2 Unit\",\"image\":\"/project/SOLAR-CELL 1.webp\"}],\"technicalSpecs\":[{\"label\":\"Kapasitas Sistem\",\"value\":\"125 kWp\"},{\"label\":\"Tipe Instalasi\",\"value\":\"Rooftop (Atap Gedung)\"},{\"label\":\"Tipe Sistem\",\"value\":\"On-Grid\"},{\"label\":\"Area Instalasi\",\"value\":\"850 m²\"}],\"beforeAfter\":{\"before\":\"\",\"after\":\"\"},\"timeline\":[{\"step\":\"Audit Energi & Desain\",\"icon\":\"search\"},{\"step\":\"Pengadaan Material\",\"icon\":\"truck\"},{\"step\":\"Instalasi Panel & Inverter\",\"icon\":\"settings\"},{\"step\":\"Testing & Commissioning\",\"icon\":\"zap\"}],\"performance\":{\"annualEnergy\":\"180.500 kWh\",\"monthlySaving\":\"Rp 25 Juta\",\"carbonReduction\":\"150 Ton\",\"equivalentTrees\":\"2.500 Pohon\"},\"whyItMatters\":[\"Mengurangi ketergantungan pada listrik PLN pada jam sibuk.\",\"Mendukung program green-hospitality dan sertifikasi bangunan hijau.\",\"Mengurangi jejak karbon di pusat kota Jakarta secara signifikan.\"],\"testimonial\":{\"quote\":\"Instalasi berjalan sangat mulus tanpa mengganggu aktivitas para tamu VIP kami. Penghematan energinya langsung terlihat di bulan pertama.\",\"name\":\"Budi Santoso\",\"title\":\"Chief Engineer\",\"company\":\"Ascott Jakarta\",\"avatar\":\"\"},\"map\":{\"address\":\"Ascott Jakarta, Jl. Kebon Sirih, Jakarta Pusat\",\"coords\":\"-6.1834,106.8235\",\"city\":\"Jakarta\",\"province\":\"DKI Jakarta\"},\"gallery\":[\"/project/ASCOTT JAKARTA 1.webp\",\"/project/ASCOTT JAKARTA 2.webp\",\"/project/ASCOTT JAKARTA 3.webp\",\"/project/ASCOTT JAKARTA 4.webp\"]}', NULL),
(27, 'bkf-badan-kebijakan-fiskal', 'BKF (Badan Kebijakan Fiskal)', 'DKI Jakarta, Indonesia', 'Instalasi panel surya di Badan Kebijakan Fiskal (BKF), sebuah gedung instansi kebijakan fiskal pemerintah di Jakarta. Proyek ini menunjukkan komitmen kami dalam mendukung inisiatif keberlanjutan pemerintah melalui adopsi energi bersih.', '/uploads/1787263641020-361541842-BKF5.webp', NULL, 1, 2, '2026-08-20 21:57:36.477', '2026-08-20 22:33:54.837', '50 kWp', '2023-11-20 00:00:00.000', 13, '{\"quickStats\":{\"solarPanels\":\"90 Modul\",\"inverters\":\"1 Unit\",\"system\":\"On-Grid\",\"roi\":\"4 Tahun\",\"co2Reduction\":\"60 Ton/th\"},\"overview\":{\"challenge\":\"Mandat pemerintah untuk mengadopsi efisiensi energi di gedung pemerintahan guna mencapai target Net Zero Emission.\",\"solution\":\"Implementasi PLTS On-Grid 50 kWp sebagai pilot project percontohan untuk instansi pemerintah lainnya.\",\"result\":\"Sistem menyuplai sekitar 20% kebutuhan listrik gedung pada siang hari.\"},\"projectInfo\":{\"client\":\"Badan Kebijakan Fiskal\",\"industry\":\"Government\",\"projectType\":\"Rooftop Solar\",\"installation\":\"November 2023\",\"duration\":\"45 Hari\",\"epcContractor\":\"Sun Global Energi\",\"warranty\":\"25 Tahun (Panel), 10 Tahun (Inverter)\",\"monitoring\":\"SCADA Integration\"},\"equipment\":[{\"name\":\"ZXI8-BD132 695-730W\",\"type\":\"Solar Panel\",\"quantity\":\"90 Unit\",\"image\":\"/project/SOLAR CELL NEW.webp\"}],\"technicalSpecs\":[{\"label\":\"Kapasitas Sistem\",\"value\":\"50 kWp\"},{\"label\":\"Tipe Instalasi\",\"value\":\"Rooftop (Atap Beton)\"},{\"label\":\"Tipe Sistem\",\"value\":\"On-Grid\"},{\"label\":\"Area Instalasi\",\"value\":\"350 m²\"}],\"beforeAfter\":{\"before\":\"\",\"after\":\"\"},\"timeline\":[{\"step\":\"Perizinan & Regulasi\",\"icon\":\"file\"},{\"step\":\"Persiapan Struktur Atap\",\"icon\":\"settings\"},{\"step\":\"Pemasangan Modul\",\"icon\":\"zap\"}],\"performance\":{\"annualEnergy\":\"75.000 kWh\",\"monthlySaving\":\"Rp 11 Juta\",\"carbonReduction\":\"60 Ton\",\"equivalentTrees\":\"1.000 Pohon\"},\"whyItMatters\":[\"Menjadi role model bagi transisi energi di sektor pemerintahan.\",\"Memastikan penghematan anggaran negara (APBN) dari sektor utilitas.\"],\"testimonial\":{\"quote\":\"Proyek ini menjadi langkah nyata kami dalam mewujudkan komitmen transisi energi bersih di lingkungan Kementerian.\",\"name\":\"Perwakilan BKF\",\"title\":\"Pejabat Pembuat Komitmen\",\"company\":\"BKF Kementerian Keuangan\",\"avatar\":\"\"},\"map\":{\"address\":\"Badan Kebijakan Fiskal, Jakarta Pusat\",\"coords\":\"-6.1700,106.8300\",\"city\":\"Jakarta\",\"province\":\"DKI Jakarta\"},\"gallery\":[\"/project/BKF 1.webp\",\"/project/BKF 2.webp\",\"/project/BKF 3.webp\",\"/project/BKF 4.webp\"]}', NULL),
(28, 'kempinski-bali', 'Kempinski Bali', 'Bali, Indonesia', 'Instalasi energi surya di Kempinski Hotel Bali, resor mewah tepi pantai bintang 5 di Nusa Dua. Proyek bergengsi ini menonjolkan keahlian kami dalam mengintegrasikan solusi tenaga surya di properti perhotelan kelas dunia dengan tetap menjaga keharmonisan estetika bangunan.', '/project/KEPINSKI BALI 1.webp', NULL, 1, 3, '2026-08-20 21:57:36.485', '2026-08-20 21:57:36.485', '250 kWp', '2024-02-10 00:00:00.000', NULL, '{\"quickStats\":{\"solarPanels\":\"450 Modul\",\"inverters\":\"5 Unit\",\"system\":\"Hybrid\",\"roi\":\"4.5 Tahun\",\"co2Reduction\":\"300 Ton/th\"},\"overview\":{\"challenge\":\"Kebutuhan energi yang masif untuk resor mewah 24/7 dan tuntutan untuk menjaga estetika atap bangunan agar tidak merusak pemandangan resor bintang 5.\",\"solution\":\"Desain khusus PLTS Hybrid 250 kWp dengan panel surya yang dipasang menyatu dengan profil atap, dilengkapi sistem penyimpanan baterai untuk backup.\",\"result\":\"Resor beroperasi dengan 35% energi terbarukan, mendapatkan penghargaan Eco-Tourism, dan mengamankan suplai listrik saat terjadi gangguan grid.\"},\"projectInfo\":{\"client\":\"Kempinski Hotels\",\"industry\":\"Hospitality\",\"projectType\":\"Hybrid Solar & Storage\",\"installation\":\"Februari 2024\",\"duration\":\"90 Hari\",\"epcContractor\":\"Sun Global Energi\",\"warranty\":\"25 Tahun (Panel), 10 Tahun (Inverter & Battery)\",\"monitoring\":\"Advanced EMS Dashboard\"},\"equipment\":[{\"name\":\"ZXI8-BD120 630-670W\",\"type\":\"Solar Panel\",\"quantity\":\"450 Unit\",\"image\":\"/project/SOLAR CELL NEW - WEB.webp\"},{\"name\":\"SMA Sunny Tripower\",\"type\":\"Hybrid Inverter\",\"quantity\":\"5 Unit\",\"image\":\"/project/SOLAR-CELL 1.webp\"}],\"technicalSpecs\":[{\"label\":\"Kapasitas Sistem\",\"value\":\"250 kWp\"},{\"label\":\"Kapasitas Baterai\",\"value\":\"500 kWh Lithium-ion\"},{\"label\":\"Tipe Sistem\",\"value\":\"Hybrid\"},{\"label\":\"Area Instalasi\",\"value\":\"1.200 m²\"}],\"beforeAfter\":{\"before\":\"\",\"after\":\"\"},\"timeline\":[{\"step\":\"Desain Arsitektural\",\"icon\":\"search\"},{\"step\":\"Pengiriman Komponen\",\"icon\":\"truck\"},{\"step\":\"Instalasi Baterai & Panel\",\"icon\":\"settings\"},{\"step\":\"Handover Resmi\",\"icon\":\"zap\"}],\"performance\":{\"annualEnergy\":\"365.000 kWh\",\"monthlySaving\":\"Rp 50 Juta\",\"carbonReduction\":\"300 Ton\",\"equivalentTrees\":\"5.000 Pohon\"},\"whyItMatters\":[\"Memastikan operasional resor tidak pernah terganggu oleh pemadaman listrik.\",\"Meningkatkan brand image resor di mata wisatawan ramah lingkungan.\",\"Pengembalian investasi (ROI) yang cepat berkat penghematan tagihan listrik premium.\"],\"testimonial\":{\"quote\":\"Tim Sun Global Energi bekerja dengan sangat hati-hati untuk memastikan tidak ada tamu yang terganggu selama instalasi. Hasilnya luar biasa secara fungsi maupun estetika.\",\"name\":\"General Manager\",\"title\":\"Kempinski Bali\",\"company\":\"Kempinski Hotels\",\"avatar\":\"\"},\"map\":{\"address\":\"Kempinski Hotel, Nusa Dua, Bali\",\"coords\":\"-8.8288,115.2166\",\"city\":\"Nusa Dua\",\"province\":\"Bali\"},\"gallery\":[\"/project/KEPINSKI BALI 1.webp\",\"/project/KEPINSKI BALI 2.webp\",\"/project/KEPINSKI BALI 3.webp\",\"/project/KEPINSKI BALI 5.webp\",\"/project/KEPINSKI BALI.webp\"]}', NULL),
(29, 'pt-mega-putra-garment', 'PT. Mega Putra Garment', 'Pemalang, Jawa Tengah', 'Instalasi PLTS Atap berskala besar untuk PT Mega Putra Garment di Pemalang. Proyek ini mendukung efisiensi biaya operasional pabrik tekstil berskala ekspor dan mendukung inisiatif fashion berkelanjutan (sustainable fashion).', '/uploads/1787263404100-23292700-PT.MegaPutraGarment-Pemalang-JawaTengah.webp', NULL, 1, 4, '2026-08-20 21:57:36.491', '2026-08-20 22:03:25.650', '500 kWp', '2023-09-10 00:00:00.000', NULL, '{\"quickStats\":{\"solarPanels\":\"920 Modul\",\"inverters\":\"8 Unit\",\"system\":\"On-Grid\",\"roi\":\"3.2 Tahun\",\"co2Reduction\":\"580 Ton/th\"},\"overview\":{\"challenge\":\"Beban biaya listrik yang sangat tinggi untuk mengoperasikan mesin jahit industri, sistem pendingin, dan pencahayaan pabrik garment siang hari.\",\"solution\":\"Instalasi PLTS Atap (On-Grid) berkapasitas 500 kWp pada atap pabrik seluas 2.500 m² untuk menyuplai beban dasar operasional siang hari.\",\"result\":\"Menurunkan tagihan listrik bulanan hingga 35% dan membantu perusahaan memenuhi standar sertifikasi ramah lingkungan bagi *buyer* internasional.\"},\"projectInfo\":{\"client\":\"PT. Mega Putra Garment\",\"industry\":\"Manufacturing\",\"projectType\":\"Industrial Rooftop\",\"installation\":\"September 2023\",\"duration\":\"45 Hari\",\"epcContractor\":\"Sun Global Energi\",\"warranty\":\"25 Tahun (Panel), 10 Tahun (Inverter)\",\"monitoring\":\"Industrial SCADA\"},\"equipment\":[{\"name\":\"ZXI8-BD132 695-730W\",\"type\":\"Solar Panel\",\"quantity\":\"920 Unit\",\"image\":\"/project/SOLAR CELL NEW.webp\"}],\"technicalSpecs\":[{\"label\":\"Kapasitas Sistem\",\"value\":\"500 kWp\"},{\"label\":\"Tipe Instalasi\",\"value\":\"Metal Roof (Kliplok)\"},{\"label\":\"Tipe Sistem\",\"value\":\"On-Grid\"},{\"label\":\"Area Instalasi\",\"value\":\"2.500 m²\"}],\"beforeAfter\":{\"before\":\"\",\"after\":\"\"},\"timeline\":[{\"step\":\"Audit Struktur Atap\",\"icon\":\"search\"},{\"step\":\"Instalasi Rel & Panel\",\"icon\":\"settings\"},{\"step\":\"Sinkronisasi Grid PLN\",\"icon\":\"zap\"}],\"performance\":{\"annualEnergy\":\"730.000 kWh\",\"monthlySaving\":\"Rp 85 Juta\",\"carbonReduction\":\"580 Ton\",\"equivalentTrees\":\"8.500 Pohon\"},\"whyItMatters\":[],\"testimonial\":{\"quote\":\"Langkah strategis kami untuk green manufacturing berhasil diwujudkan berkat instalasi cepat dan aman dari Sun Global.\",\"name\":\"Plant Manager\",\"title\":\"PT Mega Putra\",\"company\":\"Mega Putra Garment\",\"avatar\":\"\"},\"map\":{\"address\":\"Kawasan Industri Pemalang, Jawa Tengah\",\"coords\":\"-6.8887,109.3804\",\"city\":\"Pemalang\",\"province\":\"Jawa Tengah\"},\"gallery\":[\"/project/PT. Mega Putra Garment - Pemalang - Jawa Tengah.webp\"]}', NULL),
(30, 'rock-island-resort-bali', 'Rock Island Resort Bali', 'Bali, Indonesia', 'Sistem PLTS terisolasi (Off-Grid) untuk Rock Island Resort di Bali. Mengingat lokasinya yang terpencil, kami menyediakan sistem mandiri yang ditenagai 100% oleh energi surya dengan sistem baterai penyimpanan canggih.', '/uploads/1787263448396-898347165-RockislandBali.webp', NULL, 1, 5, '2026-08-20 21:57:36.498', '2026-08-20 22:04:10.539', '120 kWp', '2022-12-05 00:00:00.000', NULL, '{\"quickStats\":{\"solarPanels\":\"210 Modul\",\"inverters\":\"3 Unit\",\"system\":\"Off-Grid\",\"roi\":\"5 Tahun\",\"co2Reduction\":\"140 Ton/th\"},\"overview\":{\"challenge\":\"Lokasi resor eksklusif yang terpencil dan tidak terjangkau jaringan listrik PLN secara stabil, sehingga bergantung pada genset diesel yang mahal dan bising.\",\"solution\":\"Sistem tenaga surya *Off-Grid* mandiri dengan sistem penyimpanan baterai berkapasitas besar.\",\"result\":\"Resor beroperasi secara sunyi tanpa genset siang dan malam, memberikan pengalaman liburan premium tanpa jejak emisi.\"},\"projectInfo\":{\"client\":\"Rock Island Resort\",\"industry\":\"Hospitality\",\"projectType\":\"Off-Grid Microgrid\",\"installation\":\"Desember 2022\",\"duration\":\"60 Hari\",\"epcContractor\":\"Sun Global Energi\",\"warranty\":\"25 Tahun (Panel), 10 Tahun (Baterai)\",\"monitoring\":\"Remote Satellite Monitoring\"},\"equipment\":[{\"name\":\"ZXI8-BD120 630-670W\",\"type\":\"Solar Panel\",\"quantity\":\"210 Unit\",\"image\":\"/project/SOLAR CELL NEW - WEB.webp\"}],\"technicalSpecs\":[{\"label\":\"Kapasitas Sistem\",\"value\":\"120 kWp\"},{\"label\":\"Sistem Baterai\",\"value\":\"250 kWh\"},{\"label\":\"Tipe Sistem\",\"value\":\"Off-Grid\"}],\"beforeAfter\":{\"before\":\"\",\"after\":\"\"},\"timeline\":[{\"step\":\"Logistik Area Terpencil\",\"icon\":\"truck\"},{\"step\":\"Instalasi Baterai Bank\",\"icon\":\"settings\"},{\"step\":\"Testing & Commissioning\",\"icon\":\"zap\"}],\"performance\":{\"annualEnergy\":\"175.000 kWh\",\"monthlySaving\":\"Rp 30 Juta (BBM)\",\"carbonReduction\":\"140 Ton\",\"equivalentTrees\":\"2.200 Pohon\"},\"whyItMatters\":[],\"testimonial\":{\"quote\":\"Sekarang para tamu resor kami dapat menikmati suara deburan ombak tanpa gangguan bising generator diesel. 100% Eco-Resort!\",\"name\":\"Resort Director\",\"title\":\"Rock Island\",\"company\":\"Rock Island Bali\",\"avatar\":\"\"},\"map\":{\"address\":\"Pulau Terpencil, Bali\",\"coords\":\"-8.5000,115.3000\",\"city\":\"Nusa Penida\",\"province\":\"Bali\"},\"gallery\":[\"/project/Rock island Bali.webp\"]}', NULL),
(31, 'swro-itdc-bali', 'SWRO ITDC Bali', 'Nusa Dua, Bali', 'Proyek energi surya terintegrasi dengan fasilitas Sea Water Reverse Osmosis (SWRO) di kawasan elit ITDC Nusa Dua Bali. Sistem ini menurunkan secara drastis biaya produksi air bersih dengan mensuplai daya langsung ke pompa desalinasi bertekanan tinggi.', '/uploads/1787263520421-544426253-SWROITDCBali.webp', NULL, 1, 6, '2026-08-20 21:57:36.504', '2026-08-20 22:05:22.232', '300 kWp', '2024-05-20 00:00:00.000', NULL, '{\"quickStats\":{\"solarPanels\":\"550 Modul\",\"inverters\":\"6 Unit\",\"system\":\"On-Grid\",\"roi\":\"3.8 Tahun\",\"co2Reduction\":\"350 Ton/th\"},\"overview\":{\"challenge\":\"Proses SWRO (desalinasi air laut) membutuhkan konsumsi listrik yang luar biasa besar untuk menggerakkan pompa tekanan tinggi.\",\"solution\":\"Integrasi PLTS Atap 300 kWp langsung pada fasilitas SWRO untuk menyediakan daya di waktu operasi puncak siang hari.\",\"result\":\"Biaya produksi air bersih (Rupiah per kubik air) turun signifikan, menjadikan fasilitas ini salah satu instalasi pengelolaan air laut paling efisien di Indonesia.\"},\"projectInfo\":{\"client\":\"ITDC (Indonesia Tourism Development Corp)\",\"industry\":\"Water & Utilities\",\"projectType\":\"Industrial Solar\",\"installation\":\"Mei 2024\",\"duration\":\"75 Hari\",\"epcContractor\":\"Sun Global Energi\",\"warranty\":\"25 Tahun (Panel)\",\"monitoring\":\"Integrated Plant Controller\"},\"equipment\":[{\"name\":\"ZXI8-BD132 695-730W\",\"type\":\"Solar Panel\",\"quantity\":\"550 Unit\",\"image\":\"/project/SOLAR CELL NEW.webp\"}],\"technicalSpecs\":[{\"label\":\"Kapasitas Sistem\",\"value\":\"300 kWp\"},{\"label\":\"Tipe Instalasi\",\"value\":\"Rooftop (Metal Roof)\"},{\"label\":\"Tipe Sistem\",\"value\":\"On-Grid terintegrasi SWRO\"},{\"label\":\"Area Instalasi\",\"value\":\"1.500 m²\"}],\"beforeAfter\":{\"before\":\"\",\"after\":\"\"},\"timeline\":[{\"step\":\"Integrasi Sistem Elektrikal Pompa\",\"icon\":\"zap\"},{\"step\":\"Instalasi Panel Surya\",\"icon\":\"settings\"}],\"performance\":{\"annualEnergy\":\"438.000 kWh\",\"monthlySaving\":\"Rp 55 Juta\",\"carbonReduction\":\"350 Ton\",\"equivalentTrees\":\"4.800 Pohon\"},\"whyItMatters\":[],\"testimonial\":{\"quote\":\"Kolaborasi yang brilian. Memanfaatkan atap fasilitas untuk menurunkan biaya utama kami yaitu energi.\",\"name\":\"Plant Manager SWRO\",\"title\":\"ITDC\",\"company\":\"ITDC Nusa Dua\",\"avatar\":\"\"},\"map\":{\"address\":\"Kawasan ITDC Nusa Dua, Bali\",\"coords\":\"-8.8000,115.2200\",\"city\":\"Nusa Dua\",\"province\":\"Bali\"},\"gallery\":[\"/project/SWRO ITDC Bali.webp\"]}', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `sitesetting`
--

CREATE TABLE `sitesetting` (
  `id` int(11) NOT NULL,
  `key` varchar(191) NOT NULL,
  `value` text NOT NULL,
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sitesetting`
--

INSERT INTO `sitesetting` (`id`, `key`, `value`, `updatedAt`) VALUES
(1, 'hero_title', 'End-to-End Solar Energy Solution', '2026-08-20 22:45:27.983'),
(2, 'hero_subtitle', 'EPC – Operation & Maintenance - Financing', '2026-08-20 22:45:27.990'),
(3, 'hero_paragraph', 'Sun Global Energi delivers integrated solar energy solutions for commercial and industrial clients. From initial feasibility studies and system design to engineering, procurement, construction, commissioning, and long-term operations, we manage every stage of your solar project. Our tailored solutions are designed to reduce energy costs, improve operational reliability, and support your sustainability goals. Backed by experienced professionals, proven technologies, and a commitment to quality, we provide dependable solar solutions that deliver long-term value.', '2026-08-20 22:45:27.996'),
(4, 'hero_tagline', 'Powering a Sustainable Future, Together.', '2026-08-20 22:45:28.001'),
(5, 'mission_text', 'At Sun Global Energi, our mission is to accelerate the transition to clean and sustainable energy by delivering reliable, high-quality solar solutions that create long-term value for our clients. We believe renewable energy should be practical, accessible, and economically beneficial. Through innovative engineering, trusted partnerships, and end-to-end project delivery, we help businesses reduce energy costs, lower carbon emissions, and achieve their sustainability goals. Every solar installation—regardless of its size—contributes to a cleaner future. We are committed to making that transition simple, efficient, and successful for every client.', '2026-07-21 00:57:15.991'),
(6, 'hq_address', 'Gd. Wisma 81, Jln Cideng Barat No. 81, Jakarta Pusat 10150 Indonesia', '2026-08-20 22:54:46.296'),
(7, 'hq_phone1', '+62 21 386 2351', '2026-08-20 22:54:46.308'),
(8, 'hq_phone2', '+62 21 386 2350', '2026-08-20 22:54:46.314'),
(9, 'warehouse_address', 'Kawasan Pergudangan Modern Cikande Blok BG/5 Bandung, Kab. Serang, Banten, Indonesia 42179', '2026-08-20 22:54:46.301'),
(10, 'contact_whatsapp', '0812-8641-924', '2026-08-20 22:54:46.324'),
(11, 'contact_email', 'rizki.arrisyantoro@bachgroup.co.id', '2026-08-20 22:54:46.318'),
(12, 'hero_image', '/uploads/1787265927977-BACKGROUNDFRAMESGEREELSdanTIKTOK.webp', '2026-08-20 22:45:28.005'),
(13, 'featured_projects_submitted', '1', '2026-08-20 22:13:41.783'),
(14, 'home_featured_projects', '26,27,28,29,30,31', '2026-08-20 22:13:41.794'),
(15, 'solar_system_title', 'Solar System \r\n (Solar Cell)', '2026-08-20 22:53:16.421'),
(16, 'solar_system_image', '/uploads/1787266396414-38519186hdtsiza8230202.jpg', '2026-08-20 22:53:16.431'),
(17, 'mobile_nav_image', '/uploads/1787266486328-navbar.avif', '2026-08-20 22:54:46.331');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'admin',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `createdAt`) VALUES
(1, 'admin@sunglobal.co.id', '$2b$10$HYrUgx64ybkZpEf1t5womeoMRNmZajylLyO/ctnUQPZMf0fXGYjrS', 'Admin Sun Global', 'admin', '2026-07-20 21:00:43.510');

-- --------------------------------------------------------

--
-- Struktur dari tabel `value`
--

CREATE TABLE `value` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `pointA` varchar(191) NOT NULL,
  `pointB` varchar(191) NOT NULL,
  `pointC` varchar(191) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `value`
--

INSERT INTO `value` (`id`, `title`, `pointA`, `pointB`, `pointC`, `order`) VALUES
(1, 'Reliability', 'Deliver on every commitment.', 'Provide dependable and practical solutions.', 'Build long-term relationships based on trust and integrity.', 1),
(2, 'Excellence', 'Deliver results that create lasting value.', 'Continuously improve quality, efficiency, and performance.', 'Optimize every project through smart engineering and innovation.', 2),
(3, 'Innovation', 'Stay at the forefront of solar technologies.', 'Embrace continuous learning and improvement.', 'Develop smarter, more sustainable energy solutions.', 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('6a0ff442-c091-4e39-99ec-fb32ed87edd2', '005a5b0a3ba6e9c87f2d70cddde5d9ff70e03c1f014bbfa4bf8fdde1288919ec', '2026-07-20 20:54:06.423', '20260720205406_init', NULL, NULL, '2026-07-20 20:54:06.266', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `advantage`
--
ALTER TABLE `advantage`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Category_slug_key` (`slug`);

--
-- Indeks untuk tabel `certificate`
--
ALTER TABLE `certificate`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Product_slug_key` (`slug`),
  ADD KEY `Product_categoryId_fkey` (`categoryId`);

--
-- Indeks untuk tabel `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Project_slug_key` (`slug`),
  ADD KEY `Project_categoryId_fkey` (`categoryId`);

--
-- Indeks untuk tabel `sitesetting`
--
ALTER TABLE `sitesetting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `SiteSetting_key_key` (`key`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indeks untuk tabel `value`
--
ALTER TABLE `value`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `advantage`
--
ALTER TABLE `advantage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `certificate`
--
ALTER TABLE `certificate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT untuk tabel `sitesetting`
--
ALTER TABLE `sitesetting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `value`
--
ALTER TABLE `value`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `Project_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
