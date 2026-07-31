const fs = require('fs');
const path = require('path');

// 1. Rename files
fs.renameSync('src/app/product/[id]/page.tsx', 'src/app/product/page.tsx');
fs.rmdirSync('src/app/product/[id]');
fs.renameSync('src/app/category/[slug]/page.tsx', 'src/app/category/page.tsx');
fs.rmdirSync('src/app/category/[slug]');

// 2. Update next.config.ts
let config = fs.readFileSync('next.config.ts', 'utf8');
config = config.replace('images: {', 'output: "export",\n  images: {');
fs.writeFileSync('next.config.ts', config);

// 3. Helper to replace in files
function replaceInFile(file, regex, replacement) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content);
}

// 4. Update links
replaceInFile('src/components/home/TrendingProducts.tsx', /\/product\/\$\{product\.id\}/g, '/product?id=${product.id}');
replaceInFile('src/app/shop/page.tsx', /\/product\/\$\{product\.id\}/g, '/product?id=${product.id}');
replaceInFile('src/app/category/page.tsx', /\/product\/\$\{product\.id\}/g, '/product?id=${product.id}');

replaceInFile('src/components/layout/Navbar.tsx', /href="\/category\/([^"]+)"/g, 'href="/category?slug=$1"');
replaceInFile('src/components/layout/Footer.tsx', /href="\/category\/([^"]+)"/g, 'href="/category?slug=$1"');
replaceInFile('src/components/home/FeaturedCategories.tsx', /link: "\/category\/([^"]+)"/g, 'link: "/category?slug=$1"');

// 5. Update Product details component
let productPage = fs.readFileSync('src/app/product/page.tsx', 'utf8');
productPage = productPage.replace('import { useParams } from "next/navigation";', 'import { useSearchParams } from "next/navigation";\nimport { Suspense } from "react";');
productPage = productPage.replace('export default function ProductDetails() {', 'function ProductDetailsContent() {');
productPage = productPage.replace('const { id } = useParams() as { id: string };', 'const searchParams = useSearchParams();\n  const id = searchParams.get("id") as string;');
productPage += '\nexport default function ProductDetails() {\n  return (\n    <Suspense fallback={<div className="flex justify-center items-center min-h-[60vh]">Loading...</div>}>\n      <ProductDetailsContent />\n    </Suspense>\n  );\n}\n';
fs.writeFileSync('src/app/product/page.tsx', productPage);

// 6. Update Category details component
let categoryPage = fs.readFileSync('src/app/category/page.tsx', 'utf8');
categoryPage = categoryPage.replace('import { useParams } from "next/navigation";', 'import { useSearchParams } from "next/navigation";\nimport { Suspense } from "react";');
categoryPage = categoryPage.replace('export default function CategoryPage() {', 'function CategoryPageContent() {');
categoryPage = categoryPage.replace('const params = useParams();', 'const searchParams = useSearchParams();');
categoryPage = categoryPage.replace('const slug = params?.slug as string || "";', 'const slug = searchParams?.get("slug") as string || "";');
categoryPage += '\nexport default function CategoryPage() {\n  return (\n    <Suspense fallback={<div className="flex justify-center items-center min-h-[60vh]">Loading...</div>}>\n      <CategoryPageContent />\n    </Suspense>\n  );\n}\n';
fs.writeFileSync('src/app/category/page.tsx', categoryPage);

// 7. Remove edge runtime from layout
let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
layout = layout.replace("export const runtime = 'edge';\n\n", "");
fs.writeFileSync('src/app/layout.tsx', layout);
