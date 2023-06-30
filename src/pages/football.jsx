import React, { useEffect, useState } from 'react'
import './../css/football.css'

function Football() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.FOOTBALL_URL);
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
  }, []);


  return (
    <table className="Table">
      <thead>
        <tr>
          <th>Pos</th>
          <th>Đội</th>
          <th>P</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>F</th>
          <th>A</th>
          <th>+/-</th>
          <th>PTS Phong độ</th>
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
