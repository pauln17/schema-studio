import { Schema } from "@/types/schema";

// SQL -> Dialect Specific ASTs -> Schema
const sqlToSchema = (_sql: string): Schema => {

  return {
    name: "Example Schema",
    definition: {
      tables: [],
      enums: [],
    },
  };
};

const sqlExample = `
  CREATE TABLE teams (
    org_id INT NOT NULL,
    team_code VARCHAR(50) NOT NULL,
    PRIMARY KEY (org_id, team_code)
  );

  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    parent_id UUID,
    org_id INT NOT NULL,
    team_code VARCHAR(50) NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES users(id),
    FOREIGN KEY (org_id, team_code) REFERENCES teams(org_id, team_code)
  );
`;

export { sqlToSchema, sqlExample }