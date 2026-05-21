import type {
	RecipeDocument,
	RecipeData,
	RecipeIngredientGroup,
} from '~/types/recipe';

type RecipeLoader = () => Promise<string>;

const recipeFiles = import.meta.glob('~/content/recipes/*.md', { as: 'raw' }) as Record<
	string,
	RecipeLoader
>;

const normalizeIngredients = (value: unknown): RecipeIngredientGroup[] => {
	if (!Array.isArray(value)) {
		return [];
	}

	return value
		.map((group) => {
			if (!isRecord(group)) {
				return null;
			}

			const title = typeof group.title === 'string' ? group.title : '';
			const items = normalizeStringArray(group.items);

			if (!title && items.length === 0) {
				return null;
			}

			return { title, items };
		})
		.filter((group): group is RecipeIngredientGroup => group !== null);
};

const normalizeData = (data: Record<string, unknown>): RecipeData => {
	return {
		title: typeof data.title === 'string' ? data.title : '',
		date: typeof data.date === 'string' ? data.date : '',
		image: typeof data.image === 'string' ? data.image : undefined,
		timeToCook: typeof data.timeToCook === 'string' ? data.timeToCook : undefined,
		description: typeof data.description === 'string' ? data.description : undefined,
		tags: normalizeStringArray(data.tags),
		ingredients: normalizeIngredients(data.ingredients),
		cookTime: typeof data.cookTime === 'string' ? data.cookTime : undefined,
		servings: typeof data.servings === 'string' ? data.servings : undefined,
		difficulty: typeof data.difficulty === 'string' ? data.difficulty : undefined,
		note: typeof data.note === 'string' ? data.note : undefined,
	};
};

const parseRecipe = async (
	path: string,
	loader: RecipeLoader,
): Promise<RecipeDocument> => {
	const raw = await loader();
	const parsed = await parseMarkdown(raw);
	const data = normalizeData(isRecord(parsed.data) ? parsed.data : {});
	const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? '';

	return {
		slug,
		raw,
		data,
		body: parsed.body,
		toc: parsed.toc,
	};
};

const fetchRecipes = async (): Promise<RecipeDocument[]> => {
	const entries = await Promise.all(
		Object.entries(recipeFiles).map(([path, loader]) => parseRecipe(path, loader)),
	);

	return entries.sort((a, b) => (b.data.date || '').localeCompare(a.data.date || ''));
};

const fetchRecipeBySlug = async (slug: string): Promise<RecipeDocument | null> => {
	const match = Object.entries(recipeFiles).find(([path]) => path.endsWith(`/${slug}.md`));

	if (!match) {
		return null;
	}

	return parseRecipe(match[0], match[1]);
};

export const useRecipes = () => {
	return {
		fetchRecipes,
		fetchRecipeBySlug,
	};
};
