# Deprecated 
## To add a new api, please follow below steps: 
1. Add new endpoints `/apis` 
2. Add new react query key in `/react-query` 
3. Add response's entity in `/entities` 
4. Define api method in `/services`
5. Please do not forget to export module in each `index.ts`

# Recommended
## To add a new api, please follow below steps: 
1. Add new endpoints `/apis` 
2. Add response's entity in `/entities` 
3. Define api method in `/services`
4. Add react query key in `/keys`, the added key should include `queryKey` and `queryFn` from `service`.
5. Please do not forget to export module in each `index.ts`