import React, { useState } from 'react';
import { Modal, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FilterBox = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // Set default sort order to 'desc'

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const submitHandler = (e) => {
    e.preventDefault();
    let query = '';
    if (category) {
      query += `category=${category}`;
    }
    if (sortOrder) {
      query += `&sort=${sortOrder}`;
    }
    navigate(`/products?${query}`);
    handleCloseModal(); // Close the modal after submission
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShowModal}>
        Open Filters
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Apply Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Label className='mr-2'>Filter by Category:</Form.Label>
            <DropdownButton id='category-dropdown' title={category || 'Select Category'}>
              <Dropdown.Item onClick={() => setCategory('men')}>Men</Dropdown.Item>
              <Dropdown.Item onClick={() => setCategory('women')}>Women</Dropdown.Item>
            </DropdownButton>

            <Form.Label className='ml-3 mr-2'>Sort Order:</Form.Label>
            <DropdownButton id='sort-order-dropdown' title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}>
              <Dropdown.Item onClick={() => setSortOrder('asc')}>Ascending</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOrder('desc')}>Descending</Dropdown.Item>
            </DropdownButton>

            <Button type='submit' variant='primary' className='mt-3 d-block mx-auto'>
              Apply Filters
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FilterBox;
