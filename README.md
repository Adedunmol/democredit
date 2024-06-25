# democredit
Demo Credit is a mobile lending app API

### Database design
<img width="531" alt="democredit" src="https://github.com/Adedunmol/democredit/assets/82591608/cdd39fec-3ee9-460d-a25e-b743dd40bdb5">

### Requirements
1. A user can create an account
2. A user can fund their account
3. A user can transfer funds to another user’s account
4. A user can withdraw funds from their account.
5. A user with records in the Lendsqr Adjutor Karma blacklist should never be onboarded

### Tech used
**Runtime environment**
- [x] Node.js

**Database**
- [x] MySQL

**ORM**
- [x] Knex

**Testing framework**
- [x] Jest
- [x] Supertest

**Language**
- [x] Typescript
  
**Framework**
- [x] Express

### Installation
#### Using Git
1. Navigate & open CLI into the directory where you want to put this project & clone this project using this command.
   
```bash
git clone https://github.com/Adedunmol/democredit.git
```
2. Run npm install to install all dependencies

### Running tests
* Run `npm run test` to run unit tests.

### Setting up environments
1. There is a file named `.env.example` on the root directory of the project
2. Create a new file by copying & pasting the file on the root directory & rename it to just `.env`
3. The `.env` file is already ignored, so your credentials inside it won't be committed
4. Change the values of the file. Make changes of comment to the `.env.example` file while adding new constants to the `.env` file.

### Usage
* Run `npm run dev` to start the application.
* Connect to the API using Postman on port 3000.

### API endpoints:

#### *Indication*
- [x] **Authentication required**
- [ ] **Authentication not required**

### User related
- [ ] [Register](src/docs/register.md): `POST api/v1/auth/register/`
- [ ] [Login](src/docs/login.md): `POST api/v1/auth/login/`

### Account related
- [x] [Fund account](src/docs/fund-account.md): `POST api/v1/accounts/fund/`
- [x] [Transfer funds](src/docs/transfer-funds.md): `POST api/v1/accounts/transfer/`
- [x] [Withdraw funds](src/docs/withdraw.md): `POST api/v1/accounts/withdraw/`

### Future Improvements
1. Add a Swagger.yaml file to document the APIs
2. Add a logger to handle formatted logs. instead of using console.log which does not provide much information.
3. At the moment, the current implementation only allows one user id per account, further improvements will allow users to have multiple accounts. This will allow users to send funds to their other accounts, which the current logic doesn't cater for.