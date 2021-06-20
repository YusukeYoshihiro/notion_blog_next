import { Client } from '@notionhq/client';
import { useEffect } from 'react';


export default function About({ data }) {
  useEffect(() => {
    console.log(data);
  },);
  const getPageDisplay = () => {
    let jsx = [];
    data.results.forEach((block) => {
      if (block.type === "paragraph") {
        jsx.push(<div>{block.paragraph.text[0]?.plain_text}</div>)
      }
      if (block.type === "bulleted_list_item") {
        jsx.push(
          <ul>
            <li>{block.bulleted_list_item.text[0]?.plain_text}</li>
          </ul>
        );
      };
    });
    return jsx;
  }
  return (
    <div>{getPageDisplay()}</div>
  );
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const blockId = process.env.NOTION_ABOUT_US_BLOCK_ID;
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  console.log(response);
  return {
    props: {
      data: response,
    },
  };
}