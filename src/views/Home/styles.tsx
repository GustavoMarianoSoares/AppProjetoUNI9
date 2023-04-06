import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#339FFF",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  component: {
    fontWeight: "bold",
    fontSize: 19,
    textTransform: "uppercase",
    color: "#FFF",
  },
  orderInfos: {
    color: "#FFF",
    marginTop: 10,
    marginRight: 50,
    textTransform: "uppercase",
  },
  icons: {
    marginTop: 10,
    marginBottom: 10,
  },
  statusOpacity: {
    backgroundColor: "#339FFF",
    padding: 20,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  calls: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 16,
  },
});
