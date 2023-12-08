// This event listener ensures that the DOM is fully loaded before executing the code.
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the specific and general buttons.
    const specificButton = document.getElementById('specific');
    const generalButton = document.getElementById('general');
  
    // Add click event listeners to the specific and general buttons.
    specificButton.addEventListener('click', addToSpecificList);
    generalButton.addEventListener('click', addToGeneralList);
  
    // Function to add a new element to a specific list based on radio button selection.
    function addToSpecificList() {
      // Get the new element value and radio button selections.
      const newElement = document.getElementById('newElement').value;
      const radioButtons = document.getElementsByName('radio');
  
      // Determine the selected list based on the checked radio button.
      let selectedList;
      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          selectedList = radioButton.value;
          break;
        }
      }
  
      // Add the new element to the appropriate list.
      if (selectedList === 'fruit') {
        addToFruitList(newElement);
      } else if (selectedList === 'legume') {
        addToLegumeList(newElement);
      } else {
        addToMixList(newElement);
      }
    }
  
    // Function to add a new element to the fruit list.
    function addToFruitList(newElement) {
      const fruitList = document.querySelector('.list1 .fruit');
      const listItem = createListItem(`Fruits! - ${newElement}`);
      fruitList.appendChild(listItem);
    }
  
    // Function to add a new element to the legume list.
    function addToLegumeList(newElement) {
      const legumeList = document.querySelector('.list3 .legumes');
      const listItem = createListItem(`Legumes! - ${newElement}`);
      legumeList.appendChild(listItem);
    }
  
    // Function to add a new element to the mix list.
    function addToMixList(newElement) {
      const mixList = document.querySelector('.list2 .mix');
      const listItem = createListItem(newElement);
      mixList.appendChild(listItem);
    }
  
    // Function to add a new element to the mix list as part of the general list.
    function addToGeneralList() {
      const newElement = document.getElementById('newElement').value;
      const radioButtons = document.getElementsByName('radio');
  
      let selectedList;
      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          selectedList = radioButton.value;
          break;
        }
      }
  
      // Add the new element to the mix list with the appropriate prefix.
      if (selectedList === 'fruit') {
        addToMixList(`Fruits! - ${newElement}`);
      } else if (selectedList === 'legume') {
        addToMixList(`Legumes! - ${newElement}`);
      } else {
        addToMixList(newElement);
      }
    }
  
    // Function to create a new list item (div) with the specified text.
    function createListItem(text) {
      const listItem = document.createElement('div');
      listItem.innerHTML = `<li>${text}</li>`;
      return listItem;
    }
  });
  
  // This event listener handles search, delete, and double-click actions.
  document.addEventListener('DOMContentLoaded', function () {
    // Get references to the search and delete buttons.
    const searchButton = document.getElementById('search');
    const deleteButton = document.getElementById('delete');
  
    // Add click event listeners for search and delete actions.
    searchButton.addEventListener('click', searchForItem);
    deleteButton.addEventListener('click', deleteSelectedItem);
  
    // Add click event listener to allow selecting items for deletion.
    const listContainer = document.querySelector('.lists');
    listContainer.addEventListener('click', function (event) {
      const clickedItem = event.target.closest('li');
      if (clickedItem) {
        // Toggle the 'selected' class.
        clickedItem.classList.toggle('selected');
  
        // Change the background color based on selection.
        const isSelected = clickedItem.classList.contains('selected');
        clickedItem.style.backgroundColor = isSelected ? '#f44949' : '';
      }
    });
  
    // Add double-click event listener to mix list items.
    const mixList = document.querySelector('.list2 .mix');
    mixList.addEventListener('dblclick', function (event) {
      const doubleClickedItem = event.target.closest('li');
  
      if (doubleClickedItem) {
        const content = doubleClickedItem.textContent;
  
        // Move the item to the appropriate list based on content.
        if (content.includes('Fruits')) {
          moveItem(doubleClickedItem, '.list1 .fruit');
        } else if (content.includes('Legumes')) {
          moveItem(doubleClickedItem, '.list3 .legumes');
        }
      }
    });
  
    // Function to search for items based on the entered term.
    function searchForItem() {
      const searchTerm = document.querySelector('.search_item').value.toLowerCase();
  
      if (searchTerm.trim() === '') {
        resetSearchResults();
        return;
      }
  
      resetSearchResults();
  
      const allListItems = document.querySelectorAll('.lists li');
  
      // Highlight items that match the search term.
      allListItems.forEach((item) => {
        const itemText = item.textContent.toLowerCase();
  
        if (itemText.includes(searchTerm)) {
          item.style.backgroundColor = 'red';
        }
      });
    }
  
    // Function to reset search result highlights.
    function resetSearchResults() {
      const allListItems = document.querySelectorAll('.lists li');
      allListItems.forEach((item) => {
        item.style.backgroundColor = '';
      });
    }
  
    // Function to delete selected items.
    function deleteSelectedItem() {
      const selectedItems = document.querySelectorAll('.lists li.selected');
  
      selectedItems.forEach((item) => {
        const parentList = item.parentNode;
  
        // Remove the item from the parent list.
        item.parentNode.removeChild(item);
  
        // Check if the parent list is empty.
        if (parentList.childElementCount === 0) {
          // Set the list to be displayed but empty.
          parentList.innerHTML = '';
        }
      });
    }
  
    // Function to move an item to the target list.
    function moveItem(item, targetListSelector) {
      const targetList = document.querySelector(targetListSelector);
  
      // Change the background color to black for 1 second.
      item.style.backgroundColor = 'black';
      setTimeout(() => {
        // Revert back to the original color after 1 second.
        item.style.backgroundColor = '';
      }, 1000);
  
      targetList.appendChild(item);
    }
  });
  