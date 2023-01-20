import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
//_____________________________________________________________________________________
import './FilterIngredientPage.scss'
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import {FILTER_RECIPES_BY_INGREDIENT_REQUEST, GET_ALL_INGREDIENTS_REQUEST} from "../../redux/actions/recipes";
import MealCard from "../../components/MealCard/MealCard";
import FilterIngredientForm from "../../components/FilterIngredientForm/FilterIngredientForm";
import Pagination from "@mui/material/Pagination";
//_____________________________________________________________________________________

const FilterIngredientPage = () => {
  const {ingredient} = useParams();
  const dispatch = useDispatch();
  const selectIngredientState = useSelector((state) => state.recipes.recipes);
  const selectIngredientLoading = useSelector((state) => state.recipes.loading);
  const ingredientsState = useSelector((state) => state.recipes.ingredients);

  const [selectIngredient, setSelectIngredient] = useState((ingredient?.split(',')) || [])
  const navigate = useNavigate();

  const LIMIT_ING = 15;
  const [pageNumber, setPageNumber] = useState(1);
  const TOTAL_COUNT = selectIngredientState?.length;
  let countOfPages = TOTAL_COUNT && Math.ceil(TOTAL_COUNT / LIMIT_ING);

  console.log(selectIngredientState, 'selectIngredientState')

  useEffect(() => {
    dispatch({
      type: GET_ALL_INGREDIENTS_REQUEST,
      payload: ingredient,
    })

    window.scrollTo(0, 0)

  }, [])

  useEffect(() => {
    dispatch({
      type: FILTER_RECIPES_BY_INGREDIENT_REQUEST,
      payload: ingredient || '',
    })

  }, [ingredient, selectIngredient])

  function onChangeSelectIngredient(event, values) {
    setSelectIngredient(values)
    navigate(`/ingredient/${values}`)
    setPageNumber(1)
  }

  return (
    <main className='filterIngredient container'>

      <BreadCrumbs name={ingredient}/>

      <FilterIngredientForm
        ingredientsState={ingredientsState}
        selectIngredient={selectIngredient}
        onChangeSelectIngredient={onChangeSelectIngredient}
      />

      {selectIngredientLoading
        ? <h3>Loading...</h3>
        : selectIngredientState
          ? ingredient && <div className='mealsList'>
          {selectIngredientState?.slice(pageNumber * LIMIT_ING - LIMIT_ING, pageNumber * LIMIT_ING).map((recipe) => (
            <MealCard
              meal={recipe}
              category={recipe?.strCategory}
              key={recipe.idMeal}/>
          ))
          }
        </div>
          : !ingredient || !selectIngredient
            ? <h3>Enter ingredient</h3>
            : <h3>No dishes were found with the ingredients: {selectIngredient.join(' and ')}</h3>
      }


      {ingredient && countOfPages > 1 &&
      (<Pagination
          className='pagination'
          count={countOfPages}
          size="medium"
          page={pageNumber}
          onChange={(event, value) => setPageNumber(value)}
        />
      )}

    </main>
  );
};

export default FilterIngredientPage;