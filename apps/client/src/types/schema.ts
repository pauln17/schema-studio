export interface Column {
    name: string;
    type: string;
    primaryKey?: boolean;
    notNull?: boolean;
    unique?: boolean;
    default?: string;
    references?: { table: string; column: string };
}

export interface Table {
    name: string;
    columns: Column[];
}

export interface Enum {
    name: string;
    values: string[];
}
