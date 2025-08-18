import natural from "natural";
const TfIdf = natural.TfIdf;
const tokenizer = new natural.WordTokenizer();

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0.0, normA = 0.0, normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function getSimilarBlogs(allBlogs = [], targetBlog = {}, limit = 5) {
  if (!targetBlog || allBlogs.length === 0) return [];

  const tfidf = new TfIdf();

  allBlogs.forEach(blog => {
    const text = (blog?.description || "").toString();
    tfidf.addDocument(tokenizer.tokenize(text).join(" "));
  });

  const targetText = (targetBlog?.description || "").toString();
  const targetIndex = allBlogs.findIndex(blog => blog._id.toString() === targetBlog._id.toString());

  if (targetIndex === -1) return []; // targetBlog not found in allBlogs

  const similarities = [];

  allBlogs.forEach((blog, index) => {
    if (!blog || index === targetIndex) return;

    const vectorA = [];
    const vectorB = [];

    tfidf.listTerms(index).forEach(item => {
      vectorA.push(item.tfidf);
      vectorB.push(tfidf.tfidf(item.term, targetIndex) || 0);
    });

    const score = cosineSimilarity(vectorA, vectorB);
    similarities.push({ blog, score });
  });

  similarities.sort((a, b) => b.score - a.score);
  return similarities.slice(0, limit).map(s => s.blog);
}
