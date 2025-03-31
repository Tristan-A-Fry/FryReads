
import { useNavigate, Link } from "react-router-dom";

const InfoPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center text-white pt-24">
      
      <section className="mt-10 max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Issues</h2>
        <p className="text-lg mb-4">
          I would like to address some of the glaring issues that I know of and will fix.
        </p>
        <ul className="text-lg text-left list-disc list-inside mx-auto max-w-xl">
          <li>The forgot password on the login screen currently points to a 404 page, that is because the functionality is not set up yet.</li>
          <li>The language filter dropdown on the search screen also does not work as intended.</li>
          <li>Poor error handling</li>
        </ul>
      </section>

      <section className="mt-10 max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Upcoming Features</h2>
        <p className="text-lg mb-4">
          I would like to outline some of the features that I will be implementing soon in no particular order.
        </p>
        <ul className="text-lg text-left list-disc list-inside mx-auto max-w-xl">
          <li>Fixing the issues above</li>

          <li>
            Ability to interact with other users
            <ul className="list-disc list-inside ml-5">
              <li>Search for other users</li>
              <li>Add other users as friends</li>
              <li>Block other users / report other users</li>
            </ul>            
          </li>

          <li>
            More user customization
            <ul className="list-disc list-inside ml-5">
              <li>Username instead of just a email</li>
              <li>Add notes to books they are reading / read</li>
              <li>Ability to score the book out of 10</li>
              <li>Add a profile pciture, and banner to their profile</li>
              <li>Have a calendar showing days in a row they haved logged in</li>
              <li>Leave a review for others to see</li>
              <li>Better orginzation of users books (completed, in progress, planning)</li>
            </ul>
          </li>

          <li>
            Core under the hood "backend" features
            <ul className="list-disc list-inside ml-5">
              <li>Better error handling when it comes to login / registration</li>
              <li>Email verification</li>
              <li>Overall better error handling</li>
            </ul>
          </li>
          <li>And much more!</li>
        </ul>
      </section>

    </div>
  );
};

export default InfoPage;

