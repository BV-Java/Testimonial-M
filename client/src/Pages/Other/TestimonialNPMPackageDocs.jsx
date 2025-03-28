import React from "react";

const TestimonialNPMPackageDocs = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">
        📦 Testimonial NPM Package Documentation
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🔧 Installation</h2>
        <pre className="bg-gray-100 p-4 rounded-md text-sm">
          npm install testimonial-npm
        </pre>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🔑 Import and Connect</h2>
        <p className="mb-2">
          Import the package and connect to your testimonial project using your
          unique <strong>passcode</strong> and <strong>passkey</strong>:
        </p>
        <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap">
          {`import { connectToTestimonialsDB } from "testimonial-npm";

const testimonial = connectToTestimonialsDB("yourPasscode", "yourPasskey");`}
        </pre>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">✨ Available Functions</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            addReview(&#123; name, email, review, rating &#125;) – Add a new
            testimonial.
          </li>
          <li>getAllReviews() – Get all reviews under your project.</li>
          <li>getTopReviews() – Fetch top-rated reviews.</li>
          <li>getSusReviews() – Fetch reviews marked as suspicious.</li>
          <li>getBadReviews() – Fetch low-rated reviews.</li>
          <li>
            getReviewsByRating(rating) – Fetch reviews filtered by specific
            rating.
          </li>
          <li>editReview(email, updatedData) – Edit a specific review.</li>
          <li>deleteReview(email) – Delete a specific review.</li>
          <li>reportSus(&#123; email &#125;) – Mark a review as suspicious.</li>
          <li>
            normalReport(&#123; email &#125;) – Unmark a previously suspicious
            review.
          </li>
          <li>
            getAnalyticsOfTestimonialForTheProject() – Get analytics for your
            project.
          </li>
          <li>
            getProjectDetails() – Get details of your testimonial project.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📌 Example Usage</h2>
        <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap">
          {`import { connectToTestimonialsDB } from "testimonial-npm";

const testimonial = connectToTestimonialsDB("yourPasscode", "yourPasskey");

async function testFunctions() {
    const res1 = await testimonial.addReview({
      reviewerEmail: "registered.id@domain.com",
      name: "User Name",
      review: "Amazing product!",
      rating: 3,
    });

  const all = await testimonial.getAllReviews();
  console.log("All Reviews →", all);

  const analytics = await testimonial.getAnalytics();
  console.log("Analytics →", analytics);

  const project = await testimonial.getProjectDetails();
  console.log("Project Details →", project);
}`}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📬 Need Help?</h2>
        <p>
          Feel free to contact the package author or refer to the README in the
          npm package page for any additional details.
        </p>
      </section>
    </div>
  );
};

export default TestimonialNPMPackageDocs;
