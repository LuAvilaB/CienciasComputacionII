/**
 * HashTable class with double hashing, expansion/reduction, and density metrics
 */
class HashTable {
    constructor(initialSize = 11, maxLoadFactor = 0.7, minLoadFactor = 0.25, autoReduce = false) {
        this.size = initialSize;
        this.array = new Array(this.size);
        this.count = 0; // Number of elements stored
        this.collisions = 0; // Track collisions for organization density
        
        // User-configurable thresholds for expansion and reduction
        this.MAX_LOAD_FACTOR = maxLoadFactor;
        this.MIN_LOAD_FACTOR = minLoadFactor;
        this.AUTO_REDUCE = autoReduce; // User must enable reductions to avoid infinite loops
    }

    /**
     * Primary hash function
     */
    hash1(key) {
        return key % this.size;
    }

    /**
     * Secondary hash function for double hashing
     */
    hash2(key) {
        // Use a different modulo to ensure step size is never 0
        // Common approach: hash2(k) = 1 + (k % (size - 1))
        const prime = this.size > 2 ? this.size - 1 : 1;
        return 1 + (key % prime);
    }

    /**
     * Calculate occupancy density (α = n / m)
     * n = number of items, m = number of buckets
     */
    getOccupancyDensity() {
        return this.count / this.size;
    }

    /**
     * Calculate organization density
     * Organization density = successful comparisons / total items
     * Lower is better (means less collisions)
     */
    getOrganizationDensity() {
        if (this.count === 0) return 0;
        return this.collisions / this.count;
    }

    /**
     * Get current number of buckets
     */
    getBucketCount() {
        return this.size;
    }

    /**
     * Insert a key using double hashing for collision resolution
     */
    insert(key) {
        // Check if expansion is needed
        if (this.getOccupancyDensity() >= this.MAX_LOAD_FACTOR) {
            this.expand();
        }

        const h1 = this.hash1(key);
        const h2 = this.hash2(key);
        let index = h1;
        let probeCount = 0;

        // Double hashing: h(k, i) = (h1(k) + i * h2(k)) % size
        while (probeCount < this.size) {
            if (this.array[index] === undefined) {
                this.array[index] = key;
                this.count++;
                if (probeCount > 0) {
                    this.collisions += probeCount;
                }
                return { index, probes: probeCount + 1, wasCollision: probeCount > 0 };
            }
            
            // Check for duplicate key
            if (Array.isArray(this.array[index])) {
                if (this.array[index].indexOf(key) !== -1) {
                    throw 'Clave repetida';
                }
            } else if (this.array[index] === key) {
                throw 'Clave repetida';
            }

            probeCount++;
            index = (h1 + probeCount * h2) % this.size;
        }

        throw 'Tabla hash llena';
    }

    /**
     * Search for a key using double hashing
     */
    search(key) {
        const h1 = this.hash1(key);
        const h2 = this.hash2(key);
        let index = h1;
        let probeCount = 0;

        while (probeCount < this.size) {
            if (this.array[index] === undefined) {
                return { found: false, index: -1, probes: probeCount + 1 };
            }

            const element = this.array[index];
            if (element === key || (Array.isArray(element) && element.indexOf(key) !== -1)) {
                return { found: true, index, probes: probeCount + 1 };
            }

            probeCount++;
            index = (h1 + probeCount * h2) % this.size;
        }

        return { found: false, index: -1, probes: probeCount };
    }

    /**
     * Delete a key and check if reduction is needed (only if AUTO_REDUCE is enabled)
     */
    delete(key) {
        const result = this.search(key);
        if (!result.found) {
            throw 'Clave no encontrada';
        }

        this.array[result.index] = undefined;
        this.count--;

        // Check if reduction is needed (only if user has enabled auto-reduce)
        if (this.AUTO_REDUCE && this.getOccupancyDensity() <= this.MIN_LOAD_FACTOR && this.size > 11) {
            this.reduce();
        }

        return result.index;
    }

    /**
     * Expand the hash table (typically double the size and find next prime)
     */
    expand() {
        const oldArray = this.array;
        const oldSize = this.size;
        
        // Find next prime approximately double the current size
        this.size = this.nextPrime(this.size * 2);
        this.array = new Array(this.size);
        this.count = 0;
        this.collisions = 0;

        // Rehash all elements
        for (let i = 0; i < oldSize; i++) {
            if (oldArray[i] !== undefined) {
                if (Array.isArray(oldArray[i])) {
                    for (const key of oldArray[i]) {
                        this.insert(key);
                    }
                } else {
                    this.insert(oldArray[i]);
                }
            }
        }

        return {
            oldSize,
            newSize: this.size,
            occupancyDensity: this.getOccupancyDensity(),
            organizationDensity: this.getOrganizationDensity()
        };
    }

    /**
     * Reduce the hash table (typically half the size and find next prime)
     */
    reduce() {
        const oldArray = this.array;
        const oldSize = this.size;
        
        // Find next prime approximately half the current size (minimum 11)
        this.size = Math.max(11, this.nextPrime(Math.floor(this.size / 2)));
        this.array = new Array(this.size);
        this.count = 0;
        this.collisions = 0;

        // Rehash all elements
        for (let i = 0; i < oldSize; i++) {
            if (oldArray[i] !== undefined) {
                if (Array.isArray(oldArray[i])) {
                    for (const key of oldArray[i]) {
                        this.insert(key);
                    }
                } else {
                    this.insert(oldArray[i]);
                }
            }
        }

        return {
            oldSize,
            newSize: this.size,
            occupancyDensity: this.getOccupancyDensity(),
            organizationDensity: this.getOrganizationDensity()
        };
    }

    /**
     * Check if a number is prime
     */
    isPrime(num) {
        if (num < 2) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        
        const sqrt = Math.sqrt(num);
        for (let i = 3; i <= sqrt; i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    }

    /**
     * Find the next prime number >= num
     */
    nextPrime(num) {
        while (!this.isPrime(num)) {
            num++;
        }
        return num;
    }

    /**
     * Get metrics for display
     */
    getMetrics() {
        return {
            bucketCount: this.getBucketCount(),
            itemCount: this.count,
            occupancyDensity: this.getOccupancyDensity().toFixed(4),
            organizationDensity: this.getOrganizationDensity().toFixed(4)
        };
    }
}
