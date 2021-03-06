import { Grid, Container, Typography, Button } from "@material-ui/core";

import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";

import useStyles from "./styles";

const ProductDetails = ({ categories, onAddToCart, products }) => {
	let { sku } = useParams();

	const classes = useStyles();

	return (
		<Container maxWidth="lg">
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Grid container justify="space-between" spacing={4}>
					<Grid item xs={12} sm={3} md={2} lg={2} xl={2}>
						<CategoriesMenu categories={categories} />
					</Grid>

					<Grid
						item
						xs={12}
						sm={9}
						md={10}
						lg={10}
						xl={10}
						className={classes.media}
					>
						{products
							.filter((product) => product.sku == sku)
							.map((product) => (
								<div key={product.id}>
									<Typography variant="h4">
										{product.name}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
									>
										{" "}
										Κατηγορία:
										{product.categories
											.filter(
												(cat) => cat.name !== "featured"
											)
											.map((cat) => (
												<span key={product.id}>
													{" " + cat.name}
												</span>
											))}
									</Typography>
									<div className={classes.toolbar} />
									<Grid
										container
										justify="space-around"
										spacing={2}
										className={classes.inner}
									>
										<Grid
											item
											container
											justify="center"
											xs={12}
											sm={12}
											md={9}
											lg={8}
											xl={8}
										>
											<img
												src={product.media.source}
												alt=""
												style={{ width: "70%" }}
											/>
											<Typography
												dangerouslySetInnerHTML={{
													__html: product.description,
												}}
												variant="body1"
												style={{ color: "#666" }}
											></Typography>
										</Grid>
										<Grid
											item
											xs={12}
											sm={12}
											md={3}
											lg={4}
											xl={4}
										>
											<Typography
												variant="h5"
												gutterBottom
											>
												{
													product.price
														.formatted_with_symbol
												}
											</Typography>
											<Button
												aria-label="Add to Cart"
												onClick={() =>
													onAddToCart(product.id, 1)
												}
												variant="contained"
												color="secondary"
												className={classes.button}
											>
												ΠΡΟΣΘΗΚΗ ΣΤΟ ΚΑΛΑΘΙ
											</Button>
										</Grid>
									</Grid>
									<div className={classes.toolbar} />
									<RelatedProducts product={product} />
								</div>
							))}
					</Grid>
				</Grid>
			</main>
		</Container>
	);
};

export default ProductDetails;
