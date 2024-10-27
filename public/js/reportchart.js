document.addEventListener('DOMContentLoaded', function() {
    // ดึงข้อมูลจาก data attributes
    // ดึงข้อมูลจาก attributes ใน HTML element ที่มี id 'chartData'
    const chartDataElement = document.getElementById('chartData');
    const weeklyLoginData = JSON.parse(chartDataElement.dataset.weekly);
    const monthlyLoginData = JSON.parse(chartDataElement.dataset.monthly);

    // สร้างกราฟแสดงข้อมูลรายสัปดาห์
    // สร้างกราฟเส้นเพื่อแสดงข้อมูลการเข้าสู่ระบบรายสัปดาห์
    const weeklyChart = new Chart(
        document.getElementById('weeklyChart'),
        {
            type: 'line', // ระบุประเภทของกราฟ
            data: {
                labels: weeklyLoginData.map(item => {
                    const date = new Date(item.date);
                    return date.toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short'
                    }); // จัดรูปแบบวันที่สำหรับ labels
                }),
                datasets: [{
                    label: 'จำนวนการเข้าสู่ระบบรายสัปดาห์', // ชื่อของชุดข้อมูล
                    data: weeklyLoginData.map(item => item.count), // ข้อมูลสำหรับกราฟ
                    borderColor: 'rgb(75, 192, 192)', // สีของเส้นกราฟ
                    backgroundColor: 'rgba(75, 192, 192, 0.5)', // สีพื้นหลังใต้เส้นกราฟ
                    tension: 0.1 // ความเรียบของเส้นกราฟ
                }]
            },
            options: {
                responsive: true, // ทำให้กราฟตอบสนองต่อขนาดหน้าจอ
                plugins: {
                    title: {
                        display: true,
                        text: 'สถิติการเข้าสู่ระบบรายสัปดาห์' // ชื่อของกราฟ
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true, // เริ่มแกน y ที่ศูนย์
                        ticks: {
                            stepSize: 1 // ขนาดขั้นของแกน y
                        }
                    }
                }
            }
        }
    );

    // สร้างกราฟแสดงข้อมูลรายเดือน
    // สร้างกราฟแท่งเพื่อแสดงข้อมูลการเข้าสู่ระบบรายเดือน
    const monthlyChart = new Chart(
        document.getElementById('monthlyChart'),
        {
            type: 'bar', // ระบุประเภทของกราฟ
            data: {
                labels: monthlyLoginData.map(item => {
                    const [year, month] = item.month.split('-');
                    return `${month}/${year}`; // จัดรูปแบบเดือนสำหรับ labels
                }),
                datasets: [{
                    label: 'จำนวนการเข้าสู่ระบบรายเดือน', // ชื่อของชุดข้อมูล
                    data: monthlyLoginData.map(item => item.count), // ข้อมูลสำหรับกราฟ
                    backgroundColor: 'rgba(54, 162, 235, 0.5)', // สีพื้นหลังของแท่งกราฟ
                    borderColor: 'rgb(54, 162, 235)', // สีขอบของแท่งกราฟ
                    borderWidth: 1 // ความกว้างของขอบแท่งกราฟ
                }]
            },
            options: {
                responsive: true, // ทำให้กราฟตอบสนองต่อขนาดหน้าจอ
                plugins: {
                    title: {
                        display: true,
                        text: 'สถิติการเข้าสู่ระบบรายเดือน' // ชื่อของกราฟ
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true, // เริ่มแกน y ที่ศูนย์
                        ticks: {
                            stepSize: 1 // ขนาดขั้นของแกน y
                        }
                    }
                }
            }
        }
    );
});
