# AI Sports Injury Guide

1. Install dependencies

npm install openai @mui/material @emotion/react @emotion/styled @pinecone-database/pinecone

2. Create a .env.local file in the project root with your OpenAI and Pinecone API keys. Make sure you have OpenAI billing credits. Paste the API Key after the equals sign.

OPENAI_API_KEY=your_openai_key
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX=your_pinecone_index

3. Make sure .env.local is in .gitignore.

4. Load the injury data into Pinecone (one-time, or whenever `injuries.json` changes):

5. Then open `load.ipynb` in VS Code (or Jupyter) and run all cells. At the end, `index.describe_index_stats()` should show 4 vectors in namespace `ns1`.
