import { postInfo } from '../infra/postInfo';
import { articleId } from '../assets/env';

export async function postCompletion(completion){
    const obj = structure(completion.split('|'));
    return await postInfo({
        item_type: { 
            type: 'item_type', 
            id: articleId
        },
        pmid: parseInt(obj.pmid),
        doi: obj.doi,
        gene: obj.gene,
        polymorphism: obj.poli,
        significance: obj.p,
        population: obj.pop,
        sample: obj.tam,
        conclusion: obj.conc
    });
}

function structure(array){
    const pmid = array[0].replace('\n\nPMID: ', '');
    const doi = array[1].replace('DOI: ', '');
    const gene = array[2].replace('gene: ', '').replace('Gene: ', '');
    const poli = array[3].replace('polimorfismo: ', '').replace('Polimorfismo: ', '');
    const p = array[4].replace('p: ', '');
    const pop = array[5].replace('população: ', '').replace('População: ', '');
    const tam = array[6].replace('tamanho amostral: ', '').replace('Tamanho amostral: ', '');
    const conc = array[7].replace('conclusão: ', '').replace('Conclusão: ', '');
    return {
        pmid: pmid,
        doi: doi,
        gene: gene,
        poli: poli,
        p: p,
        pop: pop,
        tam: tam,
        conc: conc,
    }
}