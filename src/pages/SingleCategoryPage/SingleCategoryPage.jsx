import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "@mui/material/Pagination";
//_____________________________________________________________________________________
import './SingleCategoryPage.scss'
import {
  FILTER_RECIPES_BY_AREAS_REQUEST,
  FILTER_RECIPES_BY_CATEGORIES_REQUEST, GET_RECIPES_AREAS_REQUEST,
  GET_RECIPES_CATEGORIES_REQUEST
} from "../../redux/actions/recipes";
import MealCard from "../../components/MealCard/MealCard";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import CategoryItemFromList from "../../components/CategoryItemFromList/CategoryItemFromList";
//_____________________________________________________________________________________

const SingleCategoryPage = () => {
  const {categoryName, areaName} = useParams();

  const dispatch = useDispatch();
  const recipesByCategoryState = useSelector((state) => state.recipes.recipes);
  const recipesByCategoryLoading = useSelector((state) => state.recipes.loading);
  const recipesCategoriesState = useSelector((state) => state.recipes.recipesCategories);
  const recipesAreasState = useSelector((state) => state.recipes.recipesAreas);

  const LIMIT_CAT = 12;
  const [pageNumber, setPageNumber] = useState(1);
  const TOTAL_COUNT = recipesByCategoryState?.length;
  let countOfPages = TOTAL_COUNT && Math.ceil(TOTAL_COUNT / LIMIT_CAT);

  useEffect(() => {
    categoryName
      ? dispatch({
        type: FILTER_RECIPES_BY_CATEGORIES_REQUEST,
        payload: categoryName,
      })
      : dispatch({
        type: FILTER_RECIPES_BY_AREAS_REQUEST,
        payload: areaName,
      })
  }, [categoryName, areaName])

  useEffect(() => {
    categoryName
      ? dispatch({
        type: GET_RECIPES_CATEGORIES_REQUEST,
      })
      : dispatch({
        type: GET_RECIPES_AREAS_REQUEST,
      })
  }, [])

  return (
    <main className='singleCategory container'>

      <div className='singleCategory__mainPart'>
        <BreadCrumbs name={categoryName}/>
        {/*<h1 className='singleCategory__title'>Recipes by category {categoryName}</h1>*/}

        {recipesByCategoryLoading
          ? <h3>Loading...</h3>
          : <div className='mealsList'>

            {recipesByCategoryState?.slice(pageNumber * LIMIT_CAT - LIMIT_CAT, pageNumber * LIMIT_CAT).map((recipe) => (
              <MealCard
                meal={recipe}
                category={categoryName}
                key={recipe.idMeal}/>
            ))}
          </div>
        }

        {categoryName && countOfPages > 1 &&
        (<Pagination
            className='pagination'
            count={countOfPages}
            size="medium"
            page={pageNumber}
            onChange={(event, value) => setPageNumber(value)}
          />
        )}

        {areaName && countOfPages > 1 &&
        (<Pagination
            className='pagination'
            count={countOfPages}
            size="medium"
            page={pageNumber}
            onChange={(event, value) => setPageNumber(value)}
          />
        )}
      </div>

      <aside className='singleCategory__aside'>
        <h3 className='singleCategory__asideTitle'>Other {categoryName ? 'categories:' : 'areas'}</h3>
        {categoryName
          ? (recipesCategoriesState?.map((category, i) => (
            <CategoryItemFromList
              category={category}
              setPageNumber={setPageNumber}
              key={i}/>
          )))

          : (recipesAreasState?.map((category, i) => (
            <CategoryItemFromList
              category={category}
              setPageNumber={setPageNumber}
              key={i}/>
          )))

        }
      </aside>

    </main>
  );
};

export default SingleCategoryPage;