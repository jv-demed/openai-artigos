import { Configuration, OpenAIApi } from 'openai';
import { question } from '../../src/assets/env';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configuration);

export default async function (req, res){
    const art = req.body.art;
    const completion = await getCompletion(art);
    res.status(200).json({ result: completion });
}

async function getCompletion(art){
    return await openai.createCompletion({
        model: "text-davinci-003",
        prompt: art+question,
        max_tokens: 400,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    }).then(res => res.data.choices[0].text);
}

//const tam = (Math.round(art.length / 4) + 5) + (Math.round(question.length / 4) + 5);
    // return await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: art+question,
    //     max_tokens: (3999 - tam),
    //     temperature: 0,
    //     top_p: 0,
    //     frequency_penalty: 0,
    //     presence_penalty: 0
    // }).then(response => res.status(200).json({ result: response.data.choices[0].text }));
    //res.status(200).json({ result: 'oi' });