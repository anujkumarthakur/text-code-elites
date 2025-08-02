import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">ANUJ KUMAR THAKUR</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            anuj85500@gmail.com | +91-9997640942 | <a href="https://www.linkedin.com/in/anuj-thakur-b48759168/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a> | <a href="https://github.com/anuj-thakur-b48759168/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a> | <a href="https://leetcode.com/anuj-thakur-b48759168/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LeetCode</a>
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Summary</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Senior Golang Developer | AI/LLM Integrator with 6+ years of experience building scalable backend systems, AI-driven applications, and decentralized Web3 platforms. Proven ability to design intelligent architectures that combine real-time communication, microservices, and neural-model-informed system design. Experienced in building LLM-based automation tools, training models on structured data (PostgreSQL), and integrating OpenAI APIs to enhance existing workflows. Passionate self-learner constantly exploring edge technologies, with hands-on experience in building from scratch.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Technical Skills</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-1">
            <li><strong>Languages:</strong> Golang (Primary), Rust, Python (LLM/AI), Node.js (Optional)</li>
            <li><strong>Frameworks & Backend:</strong> Gin, Echo, Gorilla/Mux, net/http, GraphQL, Actix, Rocket, Warp, Tide</li>
            <li><strong>Cloud & DevOps:</strong> AWS (S3, EC2), Azure (Service Bus, APIM, App Insights), Docker, Kubernetes, Git, CI/CD</li>
            <li><strong>Databases:</strong> PostgreSQL, MySQL, Redis, MongoDB, Supabase, NoSQL, Elasticsearch</li>
            <li><strong>Messaging & Realtime:</strong> Kafka, RabbitMQ, NATS, WebSockets, LiveKit</li>
            <li><strong>Blockchain & Web3:</strong> Solana, Shadow Drive, Web3.js</li>
            <li><strong>AI/ML/LLM:</strong> OpenAI API, LangChain, Prompt Engineering, Fine-tuning, RAG Pipelines, Grafana (for monitoring)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Professional Experience</h2>
          <div className="space-y-6 mb-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Senior Golang Developer | Leader Investment Group</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Jan 2025 – Present</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Leading full-stack feature development and AI integrations across core systems.</li>
                <li>Automax CRM (Salesforce-like): Architecting a customizable, Corteza-inspired platform.</li>
                <li>Inforee (Grafana Tooling): Built secure pipelines and dashboard logic.</li>
                <li>Axionic (Realtime Infra): Built from scratch using Supabase, WebSockets, and LiveKit.</li>
                <li>Created plans to integrate OpenAI’s LLM APIs for admin-level automation (planned 2025-Q3).</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Golang Team Lead | Freelancer</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Feb 2024 – Sep 2024</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Built and deployed multiple microservice-based platforms using Golang + PostgreSQL.</li>
                <li>Consulted on an LLM-backed API suggestion engine based on structured relational data.</li>
                <li>Guided junior developers in prompt design, API chaining, and LangChain concepts.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Golang Developer | proaplicaciones</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Dec 2022 – Dec 2023</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Developed Stock Donation Platform: Real-time stock price pull + secure APIs.</li>
                <li>Created a DonorBox AI Chatbot using OpenAI API, integrated into production.</li>
                <li>Designed context-aware answers based on internal fundraising docs.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Golang Developer | CBNITS India, Kolkata</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Nov 2021 – Dec 2022</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Migrated Squadcast Platform from MongoDB to PostgreSQL with zero downtime.</li>
                <li>Enhanced Elasticsearch and GraphQL integration for payment and CRM tools.</li>
                <li>Led Azure monitoring and tracing setups for distributed services.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Golang Developer | Trodl</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Aug 2019 – Oct 2021</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Build From Scratch Troll Decentralized Social Media Platform.</li>
                <li>Built WhaleAlert Crypto Tracker to capture on-chain whale movements.</li>
                <li>Created real-time DApp for cross-exchange volume & price analysis.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Key Projects</h2>
          <div className="space-y-6 mb-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">LLM-Powered API Suggestion System</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Trained on internal PostgreSQL schema + business logic</li>
                <li>Decides whether a new API or existing one modification is needed</li>
                <li>Generates optimized API structure while preventing breaking changes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Crypto Web3 Platform (South Korea)</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>CMC/Coingecko clone with free and premium pricing signals</li>
                <li>Built using Golang, RabbitMQ, Redis, PostgreSQL, Web3</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Mosspark Ebook & Audiobook Platform (Canada)</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Solana + Rust + Gin-powered DApp with NFT ownership</li>
                <li>Hosted on Azure, data on Shadow Drive</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">TruckBookr Food Truck Booking (USA)</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Real-time e-commerce platform</li>
                <li>Booking engine + vendor panels built using Go-Gin + PostgreSQL</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Education</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-1">
            <li>B.Tech in Computer Science</li>
            <li>MERI College of Engineering, MDU Rohtak (Haryana) | 2016 – 2020</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Certifications & Self-Learning</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-1">
            <li>LLM Integration with LangChain & RAG</li>
            <li>Studied Neural Networks from first principles (math neuron → architecture intuition)</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
