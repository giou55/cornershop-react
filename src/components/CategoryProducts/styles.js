import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	content: {
		backgroundColor: "#fff",
		minHeight: "800px",
	},
	root: {
		flexGrow: 1,
	},
}));
