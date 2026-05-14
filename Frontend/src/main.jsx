import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// 🔑 المفتاح بتاعك (غيره بالمفتاح الحقيقي)
const stripePromise = loadStripe("pk_test_51TQSv1G9vL9TE9rCyhlPOg6RfWnncu1ZNzLvx6hQnIilgErx6rn76osBnhRj4QTsraeAc3OISGkpuTibchq4OFFU00kLoVfYSE");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </StrictMode>
)