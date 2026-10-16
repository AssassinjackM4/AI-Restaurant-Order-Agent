# Craveful AI Agent — Restaurant Ordering

Craveful AI Agent is a React/Vite restaurant storefront connected to a FastAPI and LangGraph ordering agent. Add multiple dishes to the bag, submit the order, and continue any partial-stock or unavailable-item conversation with the agent.

## Requirements

- Python 3.12+
- `uv`
- Node.js 20.19+ and npm
- A Groq API key for order conversations

## Configure and run

1. Copy `backend/.env.example` to `backend/.env` and add your key:

   ```dotenv
   GROQ_API_KEY=your_groq_api_key
   ```

2. Start the API:

   ```powershell
   cd backend
   uv sync
   uv run uvicorn api:app --reload
   ```

3. In another terminal, start the frontend:

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

4. Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

The menu and storefront load without an API key, but checkout returns a clear configuration error until the key is set. The API currently keeps active order conversations in memory; restarting the backend ends those sessions. Menu quantities and prices are demo data.

The hero image slider rotates automatically and can contain up to five slides. Selecting a slide restarts the 2.2-second auto-advance delay.

## Using the Groq-powered ordering agent

Once both servers are running and `GROQ_API_KEY` is set in `backend/.env`, a customer can:

1. Open the centered **AI Chef Bot** chat to ask about a dish's stock, request current stock for the whole menu, or place an order in natural language. The assistant checks inventory and accepts quantity requests without requiring checkout first. Chat sessions start at `POST /api/chat/sessions` and continue at `POST /api/sessions/{session_id}/messages`.
2. Alternatively, add one or more dishes to the bag and choose **Confirm order**. The frontend sends each dish and quantity to `POST /api/checkout`.
3. The FastAPI backend starts a LangGraph conversation for each dish. `ChatGroq` sends the user's message to `openai/gpt-oss-120b` with structured output, which extracts the intent, dish, and quantity. The backend checks inventory and returns exact stock quantities.
4. If stock is short or a dish is unavailable, reply in **Kitchen updates** or accept the available quantity. Replies continue that order's LangGraph session.
5. LangGraph routes state between the order-confirmation, cook, and serve nodes. Groq phrases customer-facing updates and interprets replies; Python nodes enforce inventory and retry rules. In this demo, cook/serve success is simulated with a 60% success probability, and the agent ends when it completes or exhausts its retry limit.

Keep the Groq key only in `backend/.env`; it is read by the Python backend and must not be added to frontend code or committed. Model requests are made during checkout and chat replies; fetching the menu does not call Groq. This is an ordering-agent demo: the menu stock and kitchen outcomes are simulated, and it does not charge a payment method or send an order to a real restaurant.

## Verify

Run the agent scenarios and API tests without making Groq requests:

```powershell
cd backend
uv run pytest
```

Build the frontend:

```powershell
cd frontend
npm run build
```
