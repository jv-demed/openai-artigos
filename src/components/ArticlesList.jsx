import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { getInfo } from '../infra/getInfo';

const ArticlesListStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
    padding-bottom: 30px;
    width: 100%;
    .title{
        display: flex;
        justify-content: space-between;
        .utils{
            display: flex;
            gap: 10px;
            button{
                padding: 0 4px;
            }
        }
    }
    td{
        border: 1px solid black;
    }
`

export function ArticlesList(){

    const tableRef = useRef(null);
    const [articles, setArticles] = useState([]);
    const [pmid, setPmid] = useState('');

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Resumos',
        sheet: 'Resumos'
    })

    useEffect(() => {
        getInfo({
            filter: {
                type: 'article',
            },
            page: {
                limit: 500
            }
        }).then(res => setArticles(res));
    }, []);

    return(
        <ArticlesListStyled className='container'>
            <div className="title">
                <h2>Resumos: {articles.length}</h2>
                <div className='utils'>
                    <button onClick={onDownload}>Export</button>
                    <input 
                        type="text" 
                        placeholder='PMID' 
                        onChange={(e) => setPmid(e.target.value)} 
                    />
                </div>
            </div>
            <table ref={tableRef}>
                <tbody>
                    <tr>
                        <th>PMID</th>
                        <th>DOI</th>
                        <th>Gene</th>
                        <th>Polimorf.</th>
                        <th>P</th>
                        <th>Pop.</th>
                        <th>Quant</th>
                        <th>Conc.</th>
                    </tr>
                    {articles.map(art => {
                        if(art.pmid.toString().includes(pmid)){
                            return(
                                <tr key={art.id}>
                                    <td>{art.pmid}</td>
                                    <td>{art.doi}</td>
                                    <td>{art.gene}</td>
                                    <td>{art.polymorphism}</td>
                                    <td>{art.significance}</td>
                                    <td>{art.population}</td>
                                    <td>{art.sample}</td>
                                    <td>{art.conclusion}</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </ArticlesListStyled>
    )
}