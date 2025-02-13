import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

const TimekeepingHistory = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(generateList);
  }, []);
  const generateList = () => {
    const today = new Date(); // Lấy ngày hiện tại
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const list = [];

    // Lặp qua từng ngày từ 1 đến ngày hiện tại
    for (let i = 1; i <= day; i++) {
      const date = new Date(year, month, i);
      const dayOfWeek = date.toLocaleDateString("vi-VN", { weekday: "long" }); // Lấy thứ trong tuần
      const formattedDate = `${dayOfWeek} ${i}/${month + 1}`;

      // Nếu là ngày Chủ nhật
      if (dayOfWeek === "Chủ nhật") {
        list.push({
          date: formattedDate,
          workingInfo: "",
          totalHours: "",
          highlight: false,
        });
      }
      // Nếu là ngày hiện tại
      else if (i === day) {
        list.push({
          date: formattedDate,
          workingInfo:
            "1125 - Trụ Sở / Chấm vào: 08:02\n- Chấm ra: --:--\nChưa xác nhận",
          totalHours: "",
          highlight: true,
        });
      }
      // Các ngày khác
      else {
        list.push({
          date: formattedDate,
          workingInfo: `Thông tin chấm công:\n1125 - Trụ Sở / Chấm vào: 08:02\n- Chấm ra: 16:48\n\nThông tin xác nhận:\n1125 - Trụ Sở / Chấm vào: 08:02\n- Chấm ra: 16:48 / administrator - Admin`,
          totalHours: (7.5 + Math.random()).toFixed(5), // Tạo giờ ngẫu nhiên từ 7.5 đến 8.5
          highlight: false,
        });
      }
    }

    // Đảo ngược thứ tự mảng
    return list.reverse();
  };

  return (
    <View style={styles.container}>
      <Header title="Lịch sử chấm công" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tháng 11/2024</Text>
          <View style={styles.rowHr} />
          <View style={styles.cardContent}>
            <View style={styles.cardContentRow}>
              <Text style={styles.cardContentText}>
                Giờ công chuẩn linh thoạt:
              </Text>
              <Text>195</Text>
            </View>
            <View style={styles.cardContentRow}>
              <Text style={styles.cardContentText}>
                Số giờ công xác nhận có đi làm:
              </Text>
              <Text>100</Text>
            </View>
            <View style={styles.cardContentRow}>
              <Text style={styles.cardContentText}>Số giờ nghỉ phép:</Text>
              <Text>8</Text>
            </View>
            <View style={styles.cardContentRow}>
              <Text style={styles.cardContentText}>
                Cảnh báo số giờ công còn thiếu:
              </Text>
              <Text>87</Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          {/* Tiêu đề bảng */}
          <View style={[styles.row, styles.header]}>
            <View style={[styles.cell, styles.borderRight]}>
              <Text style={styles.headerText}>Ngày</Text>
            </View>
            <View style={[styles.cell, styles.flex2, styles.borderRight]}>
              <Text style={styles.headerText}>Thông tin chấm công</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.headerText}>Tổng giờ công</Text>
            </View>
          </View>

          {/* Dữ liệu bảng */}
          {tableData.map((row, index) => (
            <View
              key={index}
              style={[styles.row, row.highlight ? styles.highlightRow : null]}
            >
              <View style={[styles.cell, styles.dateCell, styles.borderRight]}>
                <Text style={{ color: "#5b5b5b" }}>{row.date}</Text>
              </View>
              <View style={[styles.cell, styles.flex2, styles.borderRight]}>
                <Text style={{ color: "#5b5b5b" }}>{row.workingInfo}</Text>
              </View>
              <View style={[styles.cell]}>
                <Text style={styles.totalHours}>{row.totalHours}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    marginTop: 25,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    borderColor: "grey",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    color: "#F46138",
    fontWeight: "500",
  },
  rowHr: {
    height: 1,
    backgroundColor: "#f2efef",
    marginTop: 10,
  },
  cardContent: {
    gap: 15,
    marginTop: 15,
  },
  cardContentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardContentText: {
    color: "#5b5b5b",
    fontSize: 15,
  },
  table: {
    marginTop: 15,
    borderWidth: 0.5,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    borderColor: "grey",
    overflow: "hidden",
    marginBottom: 90
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    backgroundColor: "#F46138",
  },
  highlightRow: {
    backgroundColor: "#FFF3E0",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: 5,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  dateCell: {
    fontWeight: "bold",
    color: "#5b5b5b",
  },
  flex2: {
    flex: 2,
  },
  totalHours: {
    textAlign: "center",
    color: "#5b5b5b",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TimekeepingHistory;
