import copy
import json
from pathlib import Path


class CustomLibrary:
    def __init__(self):
        self._base_path = Path(__file__).resolve().parent.parent

    def load_json_fixture(self, relative_path):
        target = self._base_path / relative_path
        with target.open("r", encoding="utf-8") as file:
            return json.load(file)

    def deep_copy(self, data):
        return copy.deepcopy(data)

    def merge_dicts(self, base_data, extra_data):
        merged = copy.deepcopy(base_data)
        merged.update(extra_data)
        return merged

    def assert_has_json_content_type(self, headers):
        content_type = headers.get("Content-Type") or headers.get("content-type")
        if content_type is None:
            raise AssertionError("Header Content-Type not found")
        if "application/json" not in content_type.lower():
            raise AssertionError(f"Expected application/json in Content-Type, got: {content_type}")

    def assert_dict_has_keys(self, data, expected_keys):
        if not isinstance(data, dict):
            raise AssertionError(f"Expected dict response, got: {type(data)}")

        missing = [key for key in expected_keys if key not in data]
        if missing:
            raise AssertionError(f"Missing keys in response: {missing}")

    def assert_topic_present(self, topics, topic_name):
        if topic_name not in topics:
            raise AssertionError(f"Topic '{topic_name}' not found in topics list: {topics}")

    def assert_topic_absent(self, topics, topic_name):
        if topic_name in topics:
            raise AssertionError(f"Topic '{topic_name}' should not exist in topics list: {topics}")

    def add_topic_to_list(self, topics, topic_name):
        result = list(topics) if topics else []
        result.append(topic_name)
        return result

    def replace_topic_name(self, topics, old_name, new_name):
        result = list(topics) if topics else []
        replaced = False

        for index, topic in enumerate(result):
            if topic == old_name:
                result[index] = new_name
                replaced = True
                break

        if not replaced:
            raise AssertionError(f"Topic '{old_name}' not found for replacement")

        return result

    def remove_topic_name(self, topics, topic_name):
        result = [topic for topic in (topics or []) if topic != topic_name]
        if len(result) == len(topics or []):
            raise AssertionError(f"Topic '{topic_name}' not found for deletion")
        return result
