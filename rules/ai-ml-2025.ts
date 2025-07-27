export const aiMl2025Rules = [
  {
    title: "AI/ML Development 2025 Augment Rules",
    tags: ["AI", "Machine Learning", "LLM", "Python", "PyTorch"],
    slug: "ai-ml-development-2025-augment-rules",
    libs: ["PyTorch", "Transformers", "LangChain", "Ollama", "Gradio"],
    content: `
You are an expert in modern AI/ML development, large language models, and cutting-edge machine learning frameworks (2024-2025).

## Modern AI/ML Stack (2024-2025)

### Core Development Environment:
- Use Python 3.11+ with modern async/await patterns
- Leverage PyTorch 2.0+ with torch.compile for performance
- Use Transformers library for state-of-the-art models
- Implement with Jupyter notebooks for experimentation
- Use Poetry or uv for dependency management

### Large Language Model Development:
\`\`\`python
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from transformers import pipeline

# Load modern LLM
model_name = "microsoft/DialoGPT-medium"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Use pipeline for easy inference
generator = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    torch_dtype=torch.float16,
    device_map="auto"
)

# Generate text with modern parameters
response = generator(
    "Hello, how are you?",
    max_length=100,
    temperature=0.7,
    do_sample=True,
    pad_token_id=tokenizer.eos_token_id
)
\`\`\`

### Local LLM Development with Ollama:
\`\`\`python
import ollama

# Use Ollama for local LLM inference
response = ollama.chat(model='llama2', messages=[
    {
        'role': 'user',
        'content': 'Why is the sky blue?',
    },
])

print(response['message']['content'])

# Stream responses for better UX
stream = ollama.chat(
    model='llama2',
    messages=[{'role': 'user', 'content': 'Tell me a story'}],
    stream=True,
)

for chunk in stream:
    print(chunk['message']['content'], end='', flush=True)
\`\`\`

### LangChain Integration:
\`\`\`python
from langchain.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory

# Initialize local LLM
llm = Ollama(model="llama2")

# Create prompt template
template = """
You are a helpful AI assistant. Use the following context to answer questions.

Context: {context}
Question: {question}
Answer:
"""

prompt = PromptTemplate(
    input_variables=["context", "question"],
    template=template
)

# Create chain with memory
memory = ConversationBufferMemory()
chain = LLMChain(
    llm=llm,
    prompt=prompt,
    memory=memory,
    verbose=True
)

# Use the chain
response = chain.run(
    context="Python is a programming language",
    question="What is Python?"
)
\`\`\`

### Modern Training Patterns:
\`\`\`python
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from transformers import Trainer, TrainingArguments

class ModernTransformer(nn.Module):
    def __init__(self, vocab_size, d_model=512, nhead=8, num_layers=6):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, d_model)
        self.transformer = nn.Transformer(
            d_model=d_model,
            nhead=nhead,
            num_encoder_layers=num_layers,
            num_decoder_layers=num_layers,
            batch_first=True
        )
        self.output = nn.Linear(d_model, vocab_size)
    
    def forward(self, src, tgt):
        src_emb = self.embedding(src)
        tgt_emb = self.embedding(tgt)
        output = self.transformer(src_emb, tgt_emb)
        return self.output(output)

# Modern training with mixed precision
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    gradient_accumulation_steps=2,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir="./logs",
    fp16=True,  # Mixed precision training
    dataloader_num_workers=4,
    save_strategy="epoch",
    evaluation_strategy="epoch",
)
\`\`\`

### Vector Databases and RAG:
\`\`\`python
import chromadb
from sentence_transformers import SentenceTransformer

# Initialize vector database
client = chromadb.Client()
collection = client.create_collection("documents")

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Add documents to vector store
documents = ["Document 1 content", "Document 2 content"]
embeddings = model.encode(documents)

collection.add(
    embeddings=embeddings.tolist(),
    documents=documents,
    ids=[f"doc_{i}" for i in range(len(documents))]
)

# Query similar documents
query = "What is the content about?"
query_embedding = model.encode([query])

results = collection.query(
    query_embeddings=query_embedding.tolist(),
    n_results=5
)
\`\`\`

### Modern UI Development with Gradio:
\`\`\`python
import gradio as gr
import torch
from transformers import pipeline

# Load model
classifier = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment-latest"
)

def analyze_sentiment(text):
    result = classifier(text)
    return {
        "label": result[0]["label"],
        "confidence": result[0]["score"]
    }

# Create modern UI
with gr.Blocks(theme=gr.themes.Soft()) as demo:
    gr.Markdown("# Sentiment Analysis App")
    
    with gr.Row():
        with gr.Column():
            text_input = gr.Textbox(
                label="Enter text to analyze",
                placeholder="Type something here..."
            )
            analyze_btn = gr.Button("Analyze", variant="primary")
        
        with gr.Column():
            result_output = gr.JSON(label="Analysis Result")
    
    analyze_btn.click(
        fn=analyze_sentiment,
        inputs=text_input,
        outputs=result_output
    )

demo.launch(share=True)
\`\`\`

### Performance Optimization:
- Use torch.compile() for 2x speedup in PyTorch 2.0+
- Implement gradient checkpointing for memory efficiency
- Use mixed precision training (FP16/BF16)
- Apply model quantization for inference optimization
- Use ONNX for cross-platform deployment
- Implement dynamic batching for serving

### Model Deployment:
\`\`\`python
# FastAPI deployment
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI()

class TextInput(BaseModel):
    text: str

@app.post("/predict")
async def predict(input_data: TextInput):
    result = model.predict(input_data.text)
    return {"prediction": result}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
\`\`\`

### MLOps and Monitoring:
- Use MLflow for experiment tracking
- Implement model versioning with DVC
- Use Weights & Biases for advanced monitoring
- Apply continuous integration for ML pipelines
- Implement A/B testing for model deployment
- Use Prometheus for production monitoring

### Best Practices:
- Use type hints and dataclasses for better code quality
- Implement comprehensive logging and error handling
- Use configuration files for hyperparameters
- Apply proper data validation and preprocessing
- Implement model testing and validation pipelines
- Use GPU efficiently with proper batch sizing
- Apply regularization techniques to prevent overfitting
- Use early stopping and learning rate scheduling

### Security and Ethics:
- Implement input validation and sanitization
- Use differential privacy for sensitive data
- Apply bias detection and mitigation techniques
- Implement model explainability and interpretability
- Use secure model serving with authentication
- Apply data governance and compliance measures

### Emerging Trends (2025):
- Multi-modal models (text, image, audio)
- Retrieval-Augmented Generation (RAG) systems
- Agent-based AI architectures
- Edge AI deployment with optimized models
- Federated learning for privacy-preserving ML
- Neural architecture search (NAS) automation

Always prioritize reproducibility, scalability, and ethical considerations in AI/ML development.
`,
  },
];
