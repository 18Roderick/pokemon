export * from "./Pokemon.entity";

export interface PageForm {
	count: number;
	next?: string;
	previous?: string;
	results: PageResult[];
}

export interface PageResult {
	name: string;
	url: string;
}
