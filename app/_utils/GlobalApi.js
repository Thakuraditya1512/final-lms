const { gql, request } = require("graphql-request");

const MASTER_URL = "https://api-ap-south-1.hygraph.com/v2/" + process.env.NEXT_PUBLIC_HYGRAPH_API_KEY + "/master";

// Fetch all courses
const getAllCourseList = async () => {
  const query = gql`
    query MyQuery {
      courseLists(first: 20, orderBy: createdAt_DESC) {
        author
        name
        id
        free
        description
        demoUrl
        banner {
          url
        }
        chapter(first: 50) {
          ... on Chapter {
            id
            name
            video {
              url
            }
          }
        }
        totalChapters
        sourceCode
        tag
        slug
        courseId
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching course list:", error);
    throw new Error(error.message);
  }
};

// Fetch side banners
const getSideBanner = async () => {
  const query = gql`
    query GetSideBanner {
      sideBanners {
        id
        name
        banner {
          id
          url
        }
        url
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching side banner:", error);
    throw new Error(error.message);
  }
};

// Fetch course by ID
const getCourseById = async (courseId) => {
  const query = gql`
    query MyQuery {
      courseList(where: { id: "${courseId}" }) {
        author
        banner {
          url
        }
        chapter(first: 50) {
          ... on Chapter {
            id
            name
            video {
              url
            }
          }
        }
        courseId
        demoUrl
        description
        free
        price
        id
        name
        slug
        sourceCode
        tag
        youtubeUrl
        totalChapters
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw new Error(error.message);
  }
};

// Enroll user to course
const enrollToCourse = async (courseId, email) => {
  // Verify that the course exists
  const courseQuery = gql`
    query {
      courseList(where: { id: "${courseId}" }) {
        id
      }
    }
  `;
  
  try {
    const courseResult = await request(MASTER_URL, courseQuery);
    
    if (!courseResult.courseList) {
      throw new Error(`Course with ID ${courseId} does not exist.`);
    }

    const mutation = gql`
      mutation MyMutation {
        createUserEnrollCourse(
          data: {
            courseId: "${courseId}",
            userEmail: "${email}",
            courseList: { connect: { id: "${courseId}" } }
          }
        ) {
          id
        }
        publishManyUserEnrollCoursesConnection {
          edges {
            node {
              id
            }
          }
        }
      }
    `;
    const result = await request(MASTER_URL, mutation);
    return result;
  } catch (error) {
    console.error("Error enrolling user to course:", error);
    throw new Error(error.message);
  }
};

// Check if user is enrolled in course
const checkUserEnrolledToCourse = async (courseId, email) => {
  const query = gql`
    query MyQuery {
      userEnrollCourses(where: { courseId: "${courseId}", userEmail: "${email}" }) {
        id
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error checking user enrollment:", error);
    throw new Error(error.message);
  }
};

// Fetch user enrolled course details
const getUserEnrolledCourseDetails = async (id, email) => {
  const query = gql`
    query MyQuery {
      userEnrollCourses(where: { id: "${id}", userEmail: "${email}" }) {
        courseId
        id
        userEmail
        completedChapter {
          ... on CompletedChapter {
            id
            chapterId
          }
        }
        courseList {
          author
          banner {
            url
          }
          chapter(first: 50) {
            ... on Chapter {
              id
              name
              shortDesc
              video {
                url
              }
            }
          }
          demoUrl
          description
          free
          price
          id
          name
          slug
          sourceCode
          totalChapters
        }
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching user enrolled course details:", error);
    throw new Error(error.message);
  }
};

// Mark chapter as completed
const markChapterCompleted = async (enrollId, chapterId) => {
  const query = gql`
    mutation MyMutation {
      updateUserEnrollCourse(
        data: { completedChapter: { create: { chapterId: "${chapterId}" } } }
        where: { id: "${enrollId}" }
      ) {
        id
      }
      publishUserEnrollCourse(where: { id: "${enrollId}" }) {
        id
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error marking chapter as completed:", error);
    throw new Error(error.message);
  }
};

// Fetch all enrolled courses for a user
const getUserAllEnrolledCourseList = async (email) => {
  const query = gql`
    query MyQuery {
      userEnrollCourses(where: { userEmail: "${email}" }) {
        completedChapter {
          ... on CompletedChapter {
            id
            chapterId
          }
        }
        courseId
        courseList {
          name
          id
          totalChapters
          slug
          sourceCode
          free
          description
          demoUrl
          chapter(first: 50) {
            ... on Chapter {
              id
              name
            }
          }
          author
          banner {
            url
          }
        }
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching user's enrolled course list:", error);
    throw new Error(error.message);
  }
};

// Add new member
const addNewMember = async (email, paymentId) => {
  const query = gql`
    mutation MyMutation {
      createMembership(data: { active: true, email: "${email}", paymentId: "${paymentId}" }) {
        id
      }
      publishManyMemberships(to: PUBLISHED) {
        count
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error adding new member:", error);
    throw new Error(error.message);
  }
};

// Check for membership
const checkForMembership = async (email) => {
  const query = gql`
    query MyQuery {
      memberships(where: { email: "${email}" }) {
        email
        id
        paymentId
        createdAt
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error checking for membership:", error);
    throw new Error(error.message);
  }
};

export default {
  getAllCourseList,
  getSideBanner,
  getCourseById,
  enrollToCourse,
  checkUserEnrolledToCourse,
  getUserEnrolledCourseDetails,
  markChapterCompleted,
  getUserAllEnrolledCourseList,
  addNewMember,
  checkForMembership,
};
