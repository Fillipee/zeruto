export interface RecipeIngredientGroup {
	title: string | null;
	items: string[];
}

export interface RecipeData {
	title: string | null;
	date: string;
	image?: string;
	timeToCook?: string;
	description?: string;
	tags: string[];
	ingredients: RecipeIngredientGroup[];
	cookTime?: string;
	servings?: string;
	difficulty?: string;
	note?: string;
}

export interface RecipeDocument {
	slug: string;
	raw: string;
	data: RecipeData;
	body: Awaited<ReturnType<typeof parseMarkdown>>['body'];
	toc: Awaited<ReturnType<typeof parseMarkdown>>['toc'];
}
