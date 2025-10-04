-- Add Stripe customer ID to users table
ALTER TABLE users ADD COLUMN stripe_customer_id VARCHAR(255);

-- Create payments table
CREATE TABLE payments
(
  id VARCHAR(255) NOT NULL,
  stripe_payment_intent_id VARCHAR(255),
  amount DECIMAL(10,2),
  currency VARCHAR(3),
  subscription_id VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 
  PRIMARY KEY (id)
);

-- Create subscriptions table
CREATE TABLE subscriptions
(
  id VARCHAR(255) NOT NULL,
  stripe_subscription_id VARCHAR(255) NOT NULL,
  user_id INTEGER,
  status VARCHAR(50),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  product_id VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create products table for reference
CREATE TABLE products
(
  id VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  price DECIMAL(10,2),
  currency VARCHAR(3),
  interval VARCHAR(20),
  stripe_price_id VARCHAR(255),
  stripe_product_id VARCHAR(255),
 
  PRIMARY KEY (id)
);

-- Add some sample products
INSERT INTO products (id, name, price, currency, interval, stripe_price_id, stripe_product_id) VALUES
('charter-member-monthly', 'Charter Member Monthly', 11.00, 'USD', 'monthly', 'price_monthly_id', 'prod_charter_member'),
('charter-member-annual', 'Charter Member Annual', 111.00, 'USD', 'annual', 'price_annual_id', 'prod_charter_member');
