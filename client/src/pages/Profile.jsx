import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/apiCalls";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";

const Container = styled.div`
  overflow: hidden;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  padding: 50px 20px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "10px" })}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-item: center;
`;

const Column = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 150px;
  object-fit: cover;
  height: 150px;
  margin-bottom: 25px;
`;

const Infor = styled.span`
  font-weight: 500;
  padding-bottom: 10px;
`;

const Right = styled.div`
  flex: 2;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 25px;
`;

const SubTitle = styled.h1`
  font-size: 14px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const Select = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 10px 0;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

export default function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userRequest.get("users/find/" + currentUser._id);
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [currentUser]);

  const handleClickEdit = () => {
    setEditable(true);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(dispatch, currentUser._id, user, currentUser.accessToken);
  };
  return (
    <>
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <Left>
            <ProfilePicture
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
            />
            <Infor>{user.username || ""}</Infor>
            <Infor>{user.email || ""}</Infor>
          </Left>
          <Right>
            <Title>Profile Setting</Title>
            <Form>
              <Row>
                <Column>
                  <SubTitle>First name</SubTitle>
                  <Input
                    name="firstname"
                    defaultValue={user.firstname}
                    disabled={!editable}
                    onChange={handleChange}
                  />
                </Column>
                <Column>
                  <SubTitle>Last name</SubTitle>
                  <Input
                    name="lastname"
                    defaultValue={user.lastname}
                    disabled={!editable}
                    onChange={handleChange}
                  />
                </Column>
              </Row>

              <SubTitle>Username</SubTitle>
              <Input
                name="username"
                defaultValue={user.username}
                disabled={!editable}
                onChange={handleChange}
              />

              <SubTitle>Email</SubTitle>
              <Input
                name="email"
                defaultValue={user.email}
                disabled={!editable}
                onChange={handleChange}
              />

              <SubTitle>Birthday</SubTitle>
              <Input
                name="birthday"
                type="date"
                defaultValue={user.birthday}
                disabled={!editable}
                onChange={handleChange}
              />
              <SubTitle>Gender</SubTitle>
              <Select
                id="gender"
                name="gender"
                value={user.gender}
                disabled={!editable}
                onChange={handleChange}
              >
                {["Male", "Female", "Other"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
              <SubTitle>Address</SubTitle>
              <Input
                name="address"
                placeholder="Enter your address..."
                defaultValue={user.address}
                disabled={!editable}
                onChange={handleChange}
              />
              <SubTitle>Phone</SubTitle>
              <Input
                type="tel"
                name="phone"
                placeholder="Enter your phone number..."
                defaultValue={user.phone}
                disabled={!editable}
                onChange={handleChange}
              />

              {editable ? (
                <Button
                  className="profile-button"
                  type="button"
                  onClick={handleSubmit}
                >
                  Save Profile
                </Button>
              ) : (
                <Button
                  className="profile-button"
                  type="button"
                  onClick={handleClickEdit}
                >
                  Edit Profile
                </Button>
              )}
            </Form>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
}
