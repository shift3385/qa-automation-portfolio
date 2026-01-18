# ISTQB Test Design Techniques Study Notes

## 1. Equivalence Partitioning (EP)
**Definition:** A black-box test design technique where inputs to the system are divided into groups (partitions) that are expected to exhibit similar behavior. The hypothesis is that if one value in a partition works (or fails), all other values in that partition will behave the same way.

**Goal:** To reduce the number of test cases to a manageable level while maintaining reasonable coverage.

**Partitions:**
- **Valid Partition:** Values that should be accepted by the system.
- **Invalid Partition:** Values that should be rejected by the system.

## 2. Boundary Value Analysis (BVA)
**Definition:** A technique based on the observation that defects often congregate at the boundaries of inputs. BVA extends EP by selecting test values at the edges of the equivalence partitions.

**Values to Test:**
- **Minimum:** The smallest valid value.
- **Minimum - 1:** Just below the minimum (Invalid).
- **Maximum:** The largest valid value.
- **Maximum + 1:** Just above the maximum (Invalid).
- *(Optional)* Nominal value (middle).

## 3. Application: E-Commerce Login Flow

**Scenario:** User Login
**Fields:**
- **Email:** Standard format, max 50 chars.
- **Password:** Min 8 chars, max 20 chars.

### Derived Test Cases

#### A. Email Field (EP)
1.  **Valid:** `user@example.com` (Valid format)
2.  **Invalid:** `userexample.com` (Missing @)
3.  **Invalid:** `user@.com` (Missing domain)
4.  **Invalid:** `@example.com` (Missing username)
5.  **Invalid:** Empty string

#### B. Password Field (BVA & EP)
*Constraint: 8-20 characters*

**Partitions:**
- **Invalid (Too Short):** Length < 8
- **Valid:** 8 <= Length <= 20
- **Invalid (Too Long):** Length > 20

**BVA Values:**
1.  **7 chars:** `Pass123` -> **Fail** (Boundary - 1)
2.  **8 chars:** `Pass1234` -> **Pass** (Boundary Min)
3.  **20 chars:** `Password123456789012` -> **Pass** (Boundary Max)
4.  **21 chars:** `Password1234567890123` -> **Fail** (Boundary + 1)

#### C. Functional Combinations
1.  **Valid Login:** Valid Email + Valid Password -> **Success**
2.  **Invalid Login:** Valid Email + Wrong Password -> **Fail (Auth Error)**
3.  **Invalid Login:** Unregistered Email + Any Password -> **Fail (Auth Error)**
4.  **Locked User:** Valid Email (Locked Account) + Valid Password -> **Fail (Locked Error)**
