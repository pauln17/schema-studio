
import { Schema } from "@/types/schema";

// SQL -> AST -> Schema (PostgreSQL dialect for CREATE TYPE, SERIAL, etc.)
const sqlToSchema = (_sql: string, _schema: Schema): Schema => {
    return _schema;
};

const SAMPLE_SQL = `
CREATE TYPE user_role AS ENUM ('admin', 'user', 'guest');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'shipped', 'delivered');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name TEXT,
  role user_role NOT NULL DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  score DECIMAL(10,2) DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ,
  birth_date DATE
);

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  owner_id INT REFERENCES users(id)
);

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  team_id INT REFERENCES teams(id),
  status order_status DEFAULT 'pending',
  total DECIMAL(12,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id),
  product_name VARCHAR(500) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);    
`;

export { sqlToSchema, SAMPLE_SQL };
