<img width="754" alt="image" src="https://github.com/anujsingh4545/Anonymous-platform/assets/76861751/83721115-2822-4f41-806a-e56592e7437d">
<img width="960" alt="image" src="https://github.com/anujsingh4545/Anonymous-platform/assets/76861751/b61c6f7a-e120-4e6e-a4ec-4940bbe4d7e6">
<img width="960" alt="image" src="https://github.com/anujsingh4545/Anonymous-platform/assets/76861751/bc00c443-e488-4ce9-9806-38e1192bda6e">
<img width="711" alt="image" src="https://github.com/anujsingh4545/Anonymous-platform/assets/76861751/9c75d9ae-49c4-4ab2-bdcb-3a7000e673bf">
<img width="960" alt="image" src="https://github.com/anujsingh4545/Anonymous-platform/assets/76861751/25c52c3c-b377-4948-a951-36ae4f0ccea8">





# Database Example


**User Table**

| id      | name    | username | email             | password | posts | savedPost | likes |
| ------- | ------- | -------- | ----------------- | -------- | ----- | --------- | ----- |
| 1       | Alice   | alice123 | alice@example.com | password | ...   | ...       | ...   |
| 2       | Bob     | bob456   | bob@example.com   | password | ...   | ...       | ...   |
| 3       | Charlie | charlie7 | charlie@example.com | password | ... | ...       | ...   |

**Post Table:**

| id      | title             | summary         | time                | userId |
| ------- | ----------------- | --------------- | ------------------- | ------ |
| 1       | First Post        | This is a post  | 2024-05-11 10:00:00 | 1      |
| 2       | Second Post       | Another post    | 2024-05-10 15:30:00 | 2      |
| 3       | Third Post        | Yet another post| 2024-05-09 08:45:00 | 3      |

**Saved Table:**

| id      | postId |
| ------- | ------ |
| 1       | 1      |
| 2       | 3      |
| 3       | 3      |

**Upvote Table:**

| id      | userId | postId |
| ------- | ------ | ------ |
| 1       | 1      | 1      |
| 2       | 2      | 3      |
| 3       | 3      | 1      |
| 4       | 1      | 2      |

**Comments Table:**

| id      | time                | comment         |
| ------- | ------------------- | --------------- |
| 1       | 2024-05-11 10:30:00 | Nice post!      |
| 2       | 2024-05-10 16:00:00 | I like this one |
| 3       | 2024-05-09 09:00:00 | Great content   |

**Reply Table:**

| id      | time                | comment         | commentsId |
| ------- | ------------------- | --------------- | ---------- |
| 1       | 2024-05-11 11:00:00 | Thank you!      | 1          |
| 2       | 2024-05-10 16:30:00 | Me too!         | 2          |
| 3       | 2024-05-09 09:30:00 | Agree!          | 3          |

**Likes Table:**

| id      | LikeDislike | userId | commentsId | replyId |
| ------- | ----------- | ------ | ---------- | ------- |
| 1       | true        | 1      | 1          |         |
| 2       | true        | 2      | 2          |         |
| 3       | true        | 3      | 3          |         |
| 4       | true        | 1      |            | 1       |
