import type { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosError, AxiosHeaders } from "axios";
import { Category, Subcategory } from "@/interfaces/rest/category";
import { PreBulkResponse, Product } from "@/interfaces/rest/products";
import { ServerResponse } from "@/interfaces/rest/common";
import { makeMockJwt, mockAdminCredentials } from "./seed";
import { attachSubcategories, getStore } from "./store";

const NETWORK_DELAY_MS = 150;

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function ok<T>(config: AxiosRequestConfig, data: T, message = "OK", status = 200): AxiosResponse<ServerResponse<T>> {
  return {
    data: { success: true, message, data },
    status,
    statusText: "OK",
    headers: {},
    config: config as AxiosResponse<ServerResponse<T>>["config"],
  };
}

function fail(config: AxiosRequestConfig, message: string, status = 400): never {
  const response: AxiosResponse<ServerResponse<unknown>> = {
    data: { success: false, message, data: null },
    status,
    statusText: "ERROR",
    headers: {},
    config: config as AxiosResponse<ServerResponse<unknown>>["config"],
  };
  throw new AxiosError(message, String(status), config as never, null, response);
}

function pathOf(config: AxiosRequestConfig): string {
  const url = config.url ?? "";
  return url.startsWith("http") ? new URL(url).pathname : url.split("?")[0];
}

function paginate<T, K extends string>(
  items: T[],
  key: K,
  config: AxiosRequestConfig,
): { [P in K]: T[] } & { total: number } {
  const params = (config.params ?? {}) as Record<string, string>;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const limit = Math.max(1, parseInt(params.limit ?? "50", 10) || 50);
  const start = (page - 1) * limit;
  const slice = items.slice(start, start + limit);
  return { [key]: slice, total: items.length } as { [P in K]: T[] } & { total: number };
}

function parseBody<T>(config: AxiosRequestConfig): T {
  const body = config.data;
  if (!body) return {} as T;
  if (typeof body === "string") {
    try {
      return JSON.parse(body) as T;
    } catch {
      return {} as T;
    }
  }
  return body as T;
}

function match(path: string, pattern: RegExp): RegExpExecArray | null {
  return pattern.exec(path);
}

async function route(config: AxiosRequestConfig): Promise<AxiosResponse> {
  const method = (config.method ?? "get").toLowerCase();
  const path = pathOf(config);
  const store = getStore();

  // --- AUTH ---
  if (method === "get" && path === "/auth/login") {
    const auth = config.auth ?? { username: "", password: "" };
    if (auth.username === mockAdminCredentials.email && auth.password === mockAdminCredentials.password) {
      return ok(config, { accessToken: makeMockJwt() });
    }
    fail(config, "Credenciales inválidas", 401);
  }

  // --- CATEGORIES ---
  if (method === "get" && path === "/category") {
    const list = store.categories.map(attachSubcategories);
    return ok(config, paginate(list, "categories", config));
  }
  {
    const m = match(path, /^\/category\/(\d+)$/);
    if (m) {
      const id = Number(m[1]);
      const cat = store.categories.find((c) => c.id === id);
      if (!cat) fail(config, "Categoría no encontrada", 404);
      if (method === "get") return ok(config, attachSubcategories(cat!));
      if (method === "delete") {
        store.categories = store.categories.filter((c) => c.id !== id);
        store.subcategories = store.subcategories.filter((s) => s.categoryId !== id);
        return ok(config, cat!, "Categoría eliminada");
      }
      if (method === "patch") {
        const body = parseBody<Partial<Category>>(config);
        Object.assign(cat!, body);
        return ok(config, attachSubcategories(cat!), "Categoría actualizada");
      }
    }
  }
  if (method === "post" && path === "/category") {
    const body = parseBody<Category>(config);
    const created: Category = {
      ...body,
      id: store.nextId.category++,
      subCategories: [],
    };
    store.categories.push(created);
    return ok(config, created, "Categoría creada", 201);
  }

  // --- SUBCATEGORIES ---
  if (method === "get" && path === "/sub-category") {
    return ok(config, store.subcategories);
  }
  {
    const m = match(path, /^\/sub-category\/(\d+)$/);
    if (m) {
      const id = Number(m[1]);
      const sub = store.subcategories.find((s) => s.id === id);
      if (!sub) fail(config, "Subcategoría no encontrada", 404);
      if (method === "delete") {
        store.subcategories = store.subcategories.filter((s) => s.id !== id);
        return ok(config, sub!, "Subcategoría eliminada");
      }
      if (method === "patch") {
        const body = parseBody<Partial<Subcategory>>(config);
        Object.assign(sub!, body);
        return ok(config, sub!, "Subcategoría actualizada");
      }
    }
  }
  if (method === "post" && path === "/sub-category") {
    const body = parseBody<Subcategory>(config);
    const created: Subcategory = { ...body, id: store.nextId.subcategory++ };
    store.subcategories.push(created);
    return ok(config, created, "Subcategoría creada", 201);
  }

  // --- PRODUCTS ---
  if (method === "get" && path === "/product") {
    return ok(config, paginate(store.products, "products", config));
  }
  {
    const m = match(path, /^\/product\/(\d+)$/);
    if (m) {
      const id = Number(m[1]);
      const prod = store.products.find((p) => p.id === id);
      if (!prod) fail(config, "Producto no encontrado", 404);
      if (method === "get") return ok(config, prod!);
      if (method === "delete") {
        store.products = store.products.filter((p) => p.id !== id);
        return ok(config, prod!, "Producto eliminado");
      }
      if (method === "patch") {
        const body = parseBody<Partial<Product>>(config);
        Object.assign(prod!, body);
        return ok(config, prod!, "Producto actualizado");
      }
    }
  }
  if (method === "post" && path === "/product") {
    const body = parseBody<Product>(config);
    const created: Product = { ...body, id: store.nextId.product++ };
    store.products.push(created);
    return ok(config, created, "Producto creado", 201);
  }

  // --- TAGS / UNITS ---
  if (method === "get" && path === "/tag") {
    return ok(config, paginate(store.tags, "tags", config));
  }
  if (method === "get" && path === "/unit") {
    return ok(config, paginate(store.units, "units", config));
  }

  // --- SETTINGS ---
  if (method === "get" && path === "/setting") {
    return ok(config, store.settings);
  }
  if (method === "patch" && path === "/setting") {
    const body = parseBody<{ dollarValue?: string; mobileNumber?: string }>(config);
    if (body.dollarValue !== undefined) store.settings.rate.dollarValue = body.dollarValue;
    if (body.mobileNumber !== undefined) store.settings.whatsapp.mobileNumber = body.mobileNumber;
    return ok(config, store.settings, "Configuración actualizada");
  }

  // --- PRE-PRODUCTS ---
  if (method === "get" && path === "/pre-product") {
    return ok(config, paginate(store.preProducts, "preProducts", config));
  }
  if (method === "post" && path === "/pre-product/bulk-data-upload") {
    const response: PreBulkResponse = {
      quantityProductsLoaded: store.preProducts.filter((p) => p.status !== "rejected").length,
      quantityProductsNotLoaded: store.preProducts.filter((p) => p.status === "rejected").length,
      products: store.preProducts,
    };
    return ok(config, response, "Archivo procesado");
  }

  fail(config, `Mock no implementado: ${method.toUpperCase()} ${path}`, 404);
}

export const mockAdapter: AxiosAdapter = async (config) => {
  await delay(NETWORK_DELAY_MS);
  const response = await route(config);
  response.headers = new AxiosHeaders();
  return response;
};
