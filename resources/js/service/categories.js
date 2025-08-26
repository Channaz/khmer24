// Categories service for managing category data
let categoriesCache = null;

// Fetch categories from the JSON file
export const fetchCategories = async () => {
    if (categoriesCache) {
        return categoriesCache;
    }

    try {
        const response = await fetch("/data/categories.json");
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        categoriesCache = data;
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        // Return fallback data if fetch fails
        return {
            categories: [
                {
                    id: "all",
                    name: "All Category",
                    icon: "fa-solid fa-th-large",
                    color: "text-muted",
                    selected: true,
                },
                {
                    id: "vehicles",
                    name: "Cars and Vehicles",
                    icon: "fa-solid fa-car",
                    color: "text-primary",
                    hasSubcategories: true,
                    subcategories: [
                        {
                            id: "cars-sale",
                            name: "Cars for Sale",
                            icon: "fa-solid fa-car",
                            color: "text-primary",
                        },
                        {
                            id: "motorcycles",
                            name: "Motorcycles For Sale",
                            icon: "fa-solid fa-motorcycle",
                            color: "text-dark",
                        },
                    ],
                },
                {
                    id: "electronics",
                    name: "Electronics",
                    icon: "fa-solid fa-mobile-alt",
                    color: "text-primary",
                },
                {
                    id: "real-estate",
                    name: "Real Estate",
                    icon: "fa-solid fa-home",
                    color: "text-success",
                },
                {
                    id: "jobs",
                    name: "Jobs",
                    icon: "fa-solid fa-briefcase",
                    color: "text-info",
                },
            ],
        };
    }
};

// Get category by ID
export const getCategoryById = (id) => {
    if (!categoriesCache) return null;
    return categoriesCache.categories.find((cat) => cat.id === id);
};

// Get subcategories for a category
export const getSubcategories = (categoryId) => {
    const category = getCategoryById(categoryId);
    return category?.subcategories || [];
};

// Search categories by name
export const searchCategories = (query) => {
    if (!categoriesCache) return [];
    return categoriesCache.categories.filter((cat) =>
        cat.name.toLowerCase().includes(query.toLowerCase())
    );
};

// Get main categories only
export const getMainCategories = () => {
    if (!categoriesCache) return [];
    return categoriesCache.categories.filter((cat) => !cat.hasSubcategories);
};

// Clear cache
export const clearCategoriesCache = () => {
    categoriesCache = null;
};
