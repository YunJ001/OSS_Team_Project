# OSS Team Project - Today's English & Quote.

## Overview

Our project is called "Today's English & Quote."​
It’s a simple English-learning web service that helps users study vocabulary and expressions at their own pace.​
저희 프로젝트의 이름은 "Today's English & Quote"입니다.​
사용자가 본인의 속도에 맞춰 어휘와 표현을 학습할 수 있도록 도와주는 웹 애플리케이션입니다.​
​

When a user enters our web site, they’re greeted with a clean splash screen that shows a small book icon.​
It serves as a brief moment to prepare before moving into the main screen.​
사용자가 앱을 실행하면, 먼저 책 아이콘이 있는 깔끔한 스플래시 화면이 나타납니다.​
이 화면은 본격적인 학습 화면으로 넘어가기 전에 잠깐 준비하는 구간 역할을 합니다.​
​

After that, the user transitions to the home screen,​
which is designed to resemble a stage with red curtains opening—like the start of a performance.​
This is where the learning begins.​
이후에는 홈 화면으로 넘어가게 되는데,​
이 화면은 빨간 커튼이 열리는 무대처럼 연출되어 있어 마치 공연이 시작되는 듯한 느낌을 줍니다.​
여기서부터 본격적인 학습이 시작됩니다.​
​

On the home screen, users can choose between three modes:​
Word, Test, and Review.​
Each of these focuses on a different part of the learning process,​
so users can decide what to do depending on their current needs.​
홈 화면에서는 세 가지 모드 중 하나를 선택할 수 있습니다:​
Word, Test, 그리고 Review.​
각각은 학습의 다른 단계를 담당하고 있어서,​
사용자가 지금 필요한 학습 방식에 따라 자유롭게 선택할 수 있도록 되어 있습니다.​
​

We developed the service using React, TailwindCSS, and TypeScript,​
and we used external APIs like WordsAPI and Google Translate API​
to display random English words along with their Korean translations.​
이 앱은 React, TailwindCSS, TypeScript를 기반으로 개발되었고,​
WordsAPI와 Google Translate API 같은 외부 API를 활용해서​
무작위 영어 단어를 한국어 번역과 함께 보여줄 수 있도록 구성했습니다.​

## more detail & features

When a user opens the service, they’ll first see a simple splash screen,​
and then they’ll be taken to the home screen.​

사용자가 앱을 열면, 가장 먼저 간단한 스플래시 화면이 나타납니다.​
이후에는 홈 화면으로 자연스럽게 넘어가게 됩니다.​
​

On the home screen, they can choose from three options: Word, Test, or Review.​
We kept this menu simple and easy to understand, so users can focus on what they want to study right away.​

홈 화면에서는 Word, Test, Review 중 하나를 선택할 수 있습니다.​
메뉴는 단순하고 직관적으로 설계되어 있어, 사용자가 원하는 학습을 바로 시작할 수 있도록 했습니다.​
​

In the Word learning page, users can decide the number of words they want to study.​
Then, that number of words will be displayed one by one in a slide format.​

Word 학습 페이지에서는, 사용자가 학습하고 싶은 단어 개수를 입력하면​
그 수에 맞게 단어들이 슬라이드 형식으로 하나씩 표시됩니다.​
​

The layout is designed to let users concentrate on one word at a time,​
without getting distracted by too much information on the screen.​

이 레이아웃은 한 번에 하나의 단어에 집중할 수 있도록,​
또 화면에 과도한 정보로 인해 학습이 방해되지 않도록 디자인되었습니다.​
​

Users can click the left and right arrows to go through the words at their own pace.​
사용자는 좌우 화살표 버튼을 눌러 자신만의 속도로 단어를 넘길 수 있습니다.​
​

For example, if a user enters ‘5’ in the Word page,​
five random English words are displayed one at a time.​
Each word comes with its Korean translation, thanks to the APIs.​

예를 들어, 사용자가 Word 페이지에 ‘5’를 입력하면​
무작위로 선택된 5개의 영단어가 하나씩 표시되고,​
각 단어는 API를 통해 대응되는 한국어 번역과 함께 보여집니다.​
​

After finishing, users can either move on to the Test page or go back to the Home screen—​
whichever fits their learning style.​

단어 학습을 마친 뒤에는 사용자의 학습 스타일에 따라 Test 페이지로 바로 넘어가거나,​
홈 화면으로 돌아갈 수 있습니다.​
​

We’re also working on a Review feature,​
so users will soon be able to revisit what they’ve learned and keep track of their progress.​

그리고 현재는 복습 기능도 개발 중입니다.​
사용자가 이전에 학습한 내용을 다시 확인하고, 학습 진행 상황을 점검할 수 있도록 할 예정입니다.​

## Spec

**우강식**

**유윤지**
Word Page (단어 학습 페이지)

Short description of features

사용자가 지정한 수량의 영어 단어를 학습하는 핵심 페이지입니다. WordsAPI로 단어를 가져오고, Google Translate API로 실시간 한국어 번역을 제공합니다. 직관적인 UI로 단어를 넘겨가며 학습할 수 있습니다.
The core page for users to learn a specified number of English words. It fetches words via WordsAPI and provides real-time Korean translations using the Google Translate API. Users can navigate through words with an intuitive UI.

Components (Technologies and Tools)

React, TypeScript: UI 개발 및 타입 안정성 확보.
React Router: 페이지 내비게이션 관리.
TailwindCSS: 효율적인 UI 스타일링.
WordsAPI: 영어 단어 데이터 제공.
Google Translate API: 단어 번역 제공.
Vite: 빠르고 효율적인 개발 환경.
React, TypeScript: UI development and type safety.
React Router: Page navigation management.
TailwindCSS: Efficient UI styling.
WordsAPI: Provides English word data.
Google Translate API: Provides word translations.
Vite: Fast and efficient development environment.

Specs

단어 수 입력: 학습할 단어 개수 지정 (1개 이상).
동적 로딩: API를 통한 단어 및 번역 실시간 로딩.
진행 표시: 로딩 중 메시지, 현재 단어 순서(N/총 개수) 표시.
단어 이동: '이전', '다음' 버튼으로 단어 탐색.
오류 처리: API 실패 시 오류 메시지 표시.
완료 화면: 학습 완료 후 다음 단계(Test, Home)로 이동.

Word Count Input: Specify number of words to learn (1+).
Dynamic Loading: Real-time word and translation fetching via APIs.
Progress Display: Loading messages, current word position (N/Total).
Word Navigation: 'Previous', 'Next' buttons for word exploration.
Error Handling: Displays error messages on API failure.
Completion Screen: Transition to next steps (Test, Home) after study.

Functional Requirements / Non-functional Requirements

Functional Requirements (기능 요구사항)

사용자가 단어 개수를 입력하고, 해당 단어들을 순차적으로 학습할 수 있어야 합니다.
WordsAPI와 Google Translate API를 통해 단어 데이터와 번역을 정확히 가져와야 합니다.
'다음'/'이전' 버튼 클릭으로 단어 전환 및 '완료' 화면으로의 전환이 원활해야 합니다.
API 오류 발생 시 사용자에게 명확한 피드백을 제공해야 합니다.
Users must be able to input a word count and sequentially learn the specified words.
The system must accurately fetch word data from WordsAPI and translations from Google Translate API.
Smooth word navigation via 'Next'/'Previous' buttons and transition to a 'Completion' screen must be ensured.
Clear feedback must be provided to the user upon API errors.

Non-functional Requirements (비기능 요구사항)

성능: 단어 로딩 및 번역이 빠르게 이루어져야 합니다 (5초 이내).
사용성: 학습 과정이 직관적이고 사용자 친화적이어야 합니다.
안정성: API 실패에도 앱이 중단되지 않고 오류를 처리해야 합니다.
보안: API 키는 환경 변수를 통해 안전하게 관리되어야 합니다.
확장성: API 변경 또는 추가에 유연하도록 설계되어야 합니다.
일관성: 앱의 전반적인 디자인 테마를 준수해야 합니다.

Performance: Word loading and translation should be fast (within 5 seconds).
Usability: The learning process should be intuitive and user-friendly.
Reliability: The app should handle API failures gracefully without crashing.
Security: API keys must be securely managed via environment variables.
Scalability: Designed for flexibility in future API changes or additions.
Consistency: Adheres to the app's overall design theme.

**배지희**
