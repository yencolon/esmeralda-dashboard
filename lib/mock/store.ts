import { Category, Subcategory } from "@/interfaces/rest/category";
import { PreProduct, Product, Tag, Unit } from "@/interfaces/rest/products";
import { Settings } from "@/interfaces/rest/settings";
import {
  seedCategories,
  seedPreProducts,
  seedProducts,
  seedSettings,
  seedSubcategories,
  seedTags,
  seedUnits,
} from "./seed";

type Store = {
  categories: Category[];
  subcategories: Subcategory[];
  products: Product[];
  tags: Tag[];
  units: Unit[];
  preProducts: PreProduct[];
  settings: Settings;
  nextId: { category: number; subcategory: number; product: number; preProduct: number };
};

const globalKey = Symbol.for("esmeralda.mock.store");
type GlobalWithStore = typeof globalThis & { [globalKey]?: Store };
const g = globalThis as GlobalWithStore;

function createStore(): Store {
  return {
    categories: structuredClone(seedCategories),
    subcategories: structuredClone(seedSubcategories),
    products: structuredClone(seedProducts),
    tags: structuredClone(seedTags),
    units: structuredClone(seedUnits),
    preProducts: structuredClone(seedPreProducts),
    settings: structuredClone(seedSettings),
    nextId: {
      category: seedCategories.length + 1,
      subcategory: seedSubcategories.length + 1,
      product: seedProducts.length + 1,
      preProduct: seedPreProducts.length + 1,
    },
  };
}

export function getStore(): Store {
  if (!g[globalKey]) g[globalKey] = createStore();
  return g[globalKey]!;
}

export function resetStore(): void {
  g[globalKey] = createStore();
}

export function attachSubcategories(category: Category): Category {
  return {
    ...category,
    subCategories: getStore().subcategories.filter((s) => s.categoryId === category.id),
  };
}
