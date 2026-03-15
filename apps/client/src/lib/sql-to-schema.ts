
import { Schema } from "@/types/schema";

// SQL -> Dialect Specific ASTs -> Schema
export const sqlToSchema = (_sql: string, _schema: Schema): Schema => {
    return _schema;
};
