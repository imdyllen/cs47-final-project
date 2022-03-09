import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  CommunityThread: {
    postId: string;
  };
  SearchStack: {
    type: "posts" | "agreements";
  };
  Filter: undefined;
  NewPost: undefined;
  PracticePreview: {
    practiceId: string;
    topic: string;
  };
  PracticeQuestion: {
    questionIndex: number;
    practiceId: string;
    topic: string;
  };
  PracticeReview: {
    practiceId: string;
    topic: string;
  };
  AgreementDetail: {
    agreementId: string;
  };
  AgreementStack: undefined;
  AgreementSettings: undefined;
  ProfileStack: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Screen>;

export type AgreementStackParamList = {
  NewAgreement: {
    step: number;
    selectedPeople: [string | null, string | null];
  };
};

export type AgreementStackScreenProps<
  Screen extends keyof AgreementStackParamList
> = StackScreenProps<AgreementStackParamList, Screen>;

export type ProfileStackParamList = {
  Profile: undefined;
};

export type ProfileStackScreenProps<
  Screen extends keyof ProfileStackParamList
> = StackScreenProps<ProfileStackParamList, Screen>;

export type SearchStackParamList = {
  Search: {
    type: "posts" | "agreements" | "practices";
  };
  CommunityThread: {
    postId: string;
    fromSearch: boolean;
  };
  AgreementDetail: {
    agreementId: string;
  };
  PracticePreview: {
    practiceId: string;
    topic: string;
  };
  PracticeQuestion: {
    questionIndex: number;
    practiceId: string;
    topic: string;
  };
  PracticeReview: {
    practiceId: string;
    topic: string;
  };
};

export type SearchStackScreenProps<Screen extends keyof SearchStackParamList> =
  StackScreenProps<SearchStackParamList, Screen>;

export type TabParamList = {
  Community: undefined;
  ConflictResolution: undefined;
  Practice: undefined;
};

export type TabScreenProps<Screen extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, Screen>,
    StackScreenProps<RootStackParamList>
  >;
