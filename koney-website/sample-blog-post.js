/**
 * Sample Blog Post for Koney Vet Oasis Ghana
 * 
 * This file contains a sample blog post that you can use as a template
 * when creating new blog posts in your Sanity Studio.
 * 
 * To create a new blog post:
 * 1. Open your Sanity Studio (usually at http://localhost:3333 when running locally)
 * 2. Navigate to "Post" in the content types
 * 3. Click "Create new"
 * 4. Fill in the fields using the sample content below
 */

// Sample blog post content
const sampleBlogPost = {
  title: "Preventive Care: Keeping Your Pets Healthy Year-Round",
  slug: "preventive-care-keeping-your-pets-healthy", // This will be auto-generated from the title
  author: "Dr. Koney", // Reference to an author you've created in Sanity
  mainImage: "[Upload an image of a healthy pet or veterinary checkup]",
  categories: ["Pet Health", "Preventive Care"], // References to categories you've created
  publishedAt: new Date().toISOString(), // Current date
  body: [
    {
      _type: "block",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "Why Preventive Care Matters"
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "At Koney Vet Oasis Ghana, we believe that preventive care is the cornerstone of your pet's long-term health and happiness. Regular check-ups, vaccinations, parasite prevention, and dental care can help detect health issues before they become serious problems."
        }
      ]
    },
    {
      _type: "block",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "Essential Components of Preventive Care"
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "A comprehensive preventive care plan for your pet should include:"
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text: "Regular wellness exams (at least once a year for adult pets, more frequently for puppies, kittens, and senior pets)"
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text: "Vaccinations tailored to your pet's lifestyle and risk factors"
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text: "Parasite prevention for fleas, ticks, heartworms, and intestinal parasites"
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text: "Dental care, including regular cleanings and at-home maintenance"
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _type: "span",
          text: "Nutritional counseling to ensure your pet maintains a healthy weight"
        }
      ]
    },
    {
      _type: "block",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "Seasonal Considerations"
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Different seasons bring different health challenges for pets in Ghana. During the rainy season, we see an increase in skin infections and parasitic diseases. The dry season can lead to dehydration and heat-related issues. Year-round preventive care helps address these seasonal challenges before they affect your pet's health."
        }
      ]
    },
    {
      _type: "block",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "The Economic Benefits of Prevention"
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Many pet owners are surprised to learn that preventive care is not only better for their pet's health but also more economical in the long run. Treating a preventable disease or condition often costs significantly more than the preventive measures that could have avoided it entirely."
        }
      ]
    },
    {
      _type: "block",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "Schedule Your Pet's Preventive Care Visit"
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "At Koney Vet Oasis Ghana, we're committed to providing the highest standard of preventive care for your beloved pets. Contact us today to schedule a wellness exam and discuss a preventive care plan tailored to your pet's specific needs."
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Remember, a healthy pet is a happy pet, and preventive care is the key to a long, joyful life together."
        }
      ]
    }
  ]
};

// Note: This is just a reference structure. You'll need to enter this information
// manually in the Sanity Studio interface when creating a new blog post.

export default sampleBlogPost;
