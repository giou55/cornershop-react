import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { commerce } from "../../lib/commerce";

import { Grid, Container, Typography } from "@material-ui/core";

import Product from "../Product/Product";
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import useStyles from "./styles";

const CategoryProducts = ({ onAddToCart, categories }) => {
	const [products, setProducts] = useState([]);

	let { category } = useParams();

	const classes = useStyles();

	const fetchProductsByCategory = async (category) => {
		const { data } = await commerce.products.list({
			category_slug: category,
		});
		setProducts(data);
	};

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [category]);

	return (
		products && (
			<Container maxWidth="lg">
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Grid container justify="space-between" spacing={4}>
						<Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
							<CategoriesMenu categories={categories} />
						</Grid>

						<Grid
							item
							container
							spacing={3}
							xs={12}
							sm={8}
							md={9}
							lg={10}
							xl={10}
							className={classes.media}
						>
							{categories
								.filter((cat) => cat.slug == category)
								.map((cat) => (
									<Grid
										item
										key={cat.id}
										xs={12}
										sm={12}
										md={12}
										lg={12}
										xl={12}
									>
										<Typography variant="h4" gutterBottom>
											{cat.name}
										</Typography>
									</Grid>
								))}

							{products.map((product) => (
								<Grid
									item
									key={product.id}
									xs={12}
									sm={12}
									md={6}
									lg={4}
									xl={4}
								>
									<Product
										product={product}
										onAddToCart={onAddToCart}
									/>
								</Grid>
							))}
						</Grid>
					</Grid>
				</main>
			</Container>
		)
	);
};

export default CategoryProducts;
