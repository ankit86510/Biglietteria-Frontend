import React, { useEffect } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategorie } from '../../azioni';

/**
* @author
* @function MenuHeader
**/

const MenuHeader = (props) => {

  const Categorie = useSelector(state => state.categorie);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllCategorie());
  }, []);


  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.nome}>
          {
            category.parentId ? <a
              href={`/${category.slug}?nome=${category.nome}&cid=${category._id}`}>
              {category.nome}
            </a> :
            <span>{category.nome}</span>
          }
          {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
        </li>
      );
    }
    return myCategories;
  }
  return (
    <div className="menuHeader">
      <ul>
        {Categorie.categorie.length > 0 ? renderCategories(Categorie.categorie) : null}
      </ul>
    </div>
  )

}

export default MenuHeader