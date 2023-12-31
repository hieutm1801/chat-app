import React, { useEffect, useState } from 'react'
import './../css/football.css';



function Football() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.24h.com.vn/bong-da/bang-xep-hang-v-league-c48a427024.html');
        const html = await response.text();

        // Tìm đoạn mã HTML chứa bảng dữ liệu
        const tableStartIndex = html.indexOf('<table class="table');
        const tableEndIndex = html.indexOf('</table>', tableStartIndex);
        const tableHTML = html.substring(tableStartIndex, tableEndIndex + '</table>'.length);

        // Tạo một đối tượng DOM từ đoạn mã HTML
        const parser = new DOMParser();
        const tableDOM = parser.parseFromString(tableHTML, 'text/html');

        // Lấy dữ liệu từ các thẻ <td> trong bảng
        const tableRows = Array.from(tableDOM.querySelectorAll('tr'));
        const data = tableRows.map((row) => {
          const columns = Array.from(row.querySelectorAll('td'));
          return columns.map((column) => column.textContent.trim());
        });

        setTableData(data);
        console.log(data)
      } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
      }
    };

    fetchData();


    

    // const getWebsiteHtml = async (url) => {
    //   const browser = await puppeteer.launch();
    //   const page = await browser.newPage();
    //   await page.goto(url, { waitUntil: 'networkidle2' });
    //   const html = await page.content();
    //   await browser.close();

    //   return html;
    // };


    // const axios = require('axios');
    // const cheerio = require('cheerio');

    // const fetchData = async () => {
    //   try {
    //     const url = 'https://www.24h.com.vn/bong-da/bang-xep-hang-bong-da-anh-c48a466585.html?livescore_tab_ranking_type=80foo89mm28qjvyhjzlpwj28k-total';
    //     const html = await getWebsiteHtml(url);
    //     const $ = cheerio.load(html);

    //     const tableData = [];
    //     $('table.table').find('tr').each((index, element) => {
    //       const columns = $(element).find('td');
    //       const rowData = [];

    //       columns.each((_, column) => {
    //         rowData.push($(column).text());
    //       });

    //       tableData.push(rowData);
    //     });

    //     console.log(tableData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    // fetchData();

  }, []);


  return (
    <table className="Table">
      <thead>
        <tr>
          <th>TT</th>
          <th>CLB</th>
          <th>ST</th>
          <th>T</th>
          <th>H</th>
          <th>B</th>
          <th>Tg</th>
          <th>Th</th>
          <th>HS</th>
          <th>Đ</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => {
          // Bỏ qua phần tử rỗng
          if (row.length === 0) return null;

          return (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  )
}

export default Football
