import { Configuration, OpenAIApi } from 'openai';
import { apiKeyOpenai, question } from '../../src/assets/env';

const configuration = new Configuration({
    apiKey: apiKeyOpenai,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res){
    const articles = req.body.articles;
    articles.forEach(async art => {
        const tam = (Math.round(art.length / 4) + 5) + (Math.round(question.length / 4) + 5);
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: art+question,
            max_tokens: (3999 - tam),
            temperature: 0,
            top_p: 0,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    })
}