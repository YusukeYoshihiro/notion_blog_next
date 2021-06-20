import { Client } from "@notionhq/client";
import { useEffect } from "react";

export default function Employee({results}){
  useEffect(() => {
    console.log(results);
  }, )

  const getDatabaseDisplay = () =>{
    let jsx = [];
    results.forEach((product) => {
      jsx.push(
        <div className="card" key={product.id}> 
           <p>{product.properties.Name.title[0].plain_text}</p>
         
             {product.properties.Tags.multi_select.map((tag, index) => (
                <span key={index}>{tag.name}</span>
             ))}
             <p>Description : {product.properties.Description.rich_text[0].plain_text}</p>
        </div>
      );
    });
    return jsx;
  }
  return (
    <div> 
       <h1>Products</h1>
       {getDatabaseDisplay()}
    </div>
  )
};

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const databaseID = process.env.NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseID,
  })

  console.log(response);
  return {
    props:{
      results: response.results,
    }
  }
}

