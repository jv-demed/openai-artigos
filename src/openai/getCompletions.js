import { Configuration, OpenAIApi } from 'openai';
import { apiKeyOpenai, question } from '../assets/env';

//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

const configuration = new Configuration({
    apiKey: apiKeyOpenai,
});

const openai = new OpenAIApi(configuration);

export async function getCompletions(articles){
    return await articles.map(async article => {
        await apiOpenai(article);
    });
}

async function apiOpenai(article){
    await openai.createCompletion({
        model: "text-davinci-003",
        prompt: article+question,
        temperature: 0,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    }).then(res => console.log(res));
}