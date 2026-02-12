# ARCHITECTURE_RULES

## 1. Project Architecture Overview
- Use a BFF architecture: Next.js API routes are the single entry point for frontend data access.
- Keep business logic in the service layer, not in UI components or route handlers.
- Maintain a dedicated DTO layer to define public data contracts.
- Keep API routes as thin controllers: parse request, call service, return response.
- Keep the UI layer presentation-focused with no business logic.

## 2. Folder Structure
- `src/services/`: business logic and orchestration.
- `src/types/dto/`: DTO contracts used by services, routes, and UI.
- `features/`: isolated feature modules (UI, local state, feature-specific wiring).
- `app/api/`: BFF routes only, thin controller behavior.
- Preserve clear boundaries between UI modules and service/data logic.

## 3. Service Layer Rules
- Services handle all business logic (filtering, sorting, scoring, mapping, rules).
- Do not place business logic in routes or UI components.
- Services return DTOs only.
- Services must not depend on HTTP request/response objects.

## 4. DTO Layer Rules
- Define DTOs only under `src/types/dto/`.
- Do not expose raw database or microservice models to API responses or UI.
- Services are responsible for mapping internal models to DTOs.
- Keep DTO fields stable and explicit.

## 5. UI Rules
- UI must not compute business logic (ranking, badge rules, pricing rules, publish logic).
- UI must only consume DTOs and render state.
- UI may manage interaction state and responsiveness only.
- Viewport/mobile behavior is a UI concern, not a business/service concern.

## 6. API Rules
- All `app/api` handlers must remain thin controllers.
- Route handlers must not contain filtering/sorting/business rule code.
- Route handlers must call services for all domain logic.
- Return DTO-shaped responses from routes.

## 7. Filtering & Sorting Rules
- Filtering and sorting logic must be implemented in `search.service.ts`.
- UI sends filter/sort parameters through URL query params only.
- Routes pass parsed params to services and return service output.
- Keep filtering/sorting behavior centralized and testable in service layer.

## 8. Test Coverage Expectations
- Add service-level tests for business logic and edge cases.
- Add API route tests for controller behavior and contract shape.
- Add UI component tests for behavior, accessibility, and responsive interactions.
- Keep tests aligned with architectural boundaries.

## 9. Naming Conventions
- Use `kebab-case` for URL query keys and URL enum values.
- Use `camelCase` for DTO fields.
- Use clear, consistent TypeScript type names (e.g., `JobDTO`, `SearchResultDTO`).
- Keep naming consistent across config, DTOs, and service interfaces.

## 10. Multi-service Safety
- Avoid direct coupling between unrelated services/modules.
- UI must communicate only with the BFF layer.
- BFF is responsible for orchestration across services.
- Do not leak service internals or storage schema across boundaries.
